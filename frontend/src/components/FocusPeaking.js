import React, { useEffect, useRef, useState } from 'react';

const FocusPeaking = ({ videoRef, showFocusPeaking, peakingColor = '#ff0000', sensitivity = 30 }) => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!videoRef.current) return;

        const updateDimensions = () => {
            if (videoRef.current) {
                setDimensions({
                    width: videoRef.current.videoWidth || videoRef.current.clientWidth,
                    height: videoRef.current.videoHeight || videoRef.current.clientHeight
                });
            }
        };

        // Set initial dimensions
        updateDimensions();

        // Update dimensions when video metadata loads
        videoRef.current.addEventListener('loadedmetadata', updateDimensions);

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('loadedmetadata', updateDimensions);
            }
        };
    }, [videoRef]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !videoRef.current) return;

        const ctx = canvas.getContext('2d');

        const drawFocusPeaking = () => {
            if (!videoRef.current || !canvas) return;

            // Clear canvas if focus peaking is off
            if (!showFocusPeaking) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }

            const { width, height } = dimensions;
            canvas.width = width;
            canvas.height = height;

            // Make sure video is playing and has dimensions
            if (width === 0 || height === 0) return;

            // Draw video frame to canvas
            ctx.drawImage(videoRef.current, 0, 0, width, height);

            // Get image data
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            // Convert peaking color from hex to RGB
            const hexToRgb = (hex) => {
                const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : { r: 255, g: 0, b: 0 }; // Default to red if parse fails
            };

            const peakingRgb = hexToRgb(peakingColor);

            // Create a temporary array to hold grayscale values
            const gray = new Uint8Array(width * height);

            // Convert to grayscale for edge detection
            for (let i = 0, j = 0; i < data.length; i += 4, j++) {
                // Convert RGB to grayscale using luminosity method
                gray[j] = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
            }

            // Simple edge detection using Sobel operator (simplified)
            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    const idx = y * width + x;

                    // Compute local gradient (simplified Sobel)
                    const gx =
                        -1 * gray[idx - width - 1] +
                        -2 * gray[idx - 1] +
                        -1 * gray[idx + width - 1] +
                        1 * gray[idx - width + 1] +
                        2 * gray[idx + 1] +
                        1 * gray[idx + width + 1];

                    const gy =
                        -1 * gray[idx - width - 1] +
                        -2 * gray[idx - width] +
                        -1 * gray[idx - width + 1] +
                        1 * gray[idx + width - 1] +
                        2 * gray[idx + width] +
                        1 * gray[idx + width + 1];

                    // Magnitude of gradient
                    const magnitude = Math.sqrt(gx * gx + gy * gy);

                    // Apply threshold for focus peaking (adjustable via sensitivity)
                    if (magnitude > sensitivity) {
                        const pixelIndex = (y * width + x) * 4;
                        data[pixelIndex] = peakingRgb.r;
                        data[pixelIndex + 1] = peakingRgb.g;
                        data[pixelIndex + 2] = peakingRgb.b;
                        data[pixelIndex + 3] = 255; // Full opacity
                    }
                }
            }

            // Put processed image data back to canvas
            ctx.putImageData(imageData, 0, 0);
        };

        const intervalId = setInterval(drawFocusPeaking, 1000 / 30); // 30 FPS update

        return () => {
            clearInterval(intervalId);
        };
    }, [videoRef, showFocusPeaking, dimensions, peakingColor, sensitivity]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: dimensions.width,
                height: dimensions.height,
                pointerEvents: 'none',
            }}
        />
    );
};

export default FocusPeaking;
