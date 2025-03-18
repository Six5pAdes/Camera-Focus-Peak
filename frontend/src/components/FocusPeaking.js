import React, { useEffect, useRef } from 'react';

const FocusPeaking = ({ videoRef, showFocusPeaking }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const drawFocusPeaking = () => {
            if (!showFocusPeaking) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }

            const { width, height } = videoRef.current;
            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(videoRef.current, 0, 0, width, height);

            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                if (r > 200 && g < 100 && b < 100) {
                    data[i] = 255;
                    data[i + 1] = 255;
                    data[i + 2] = 255;
                }
            }

            ctx.putImageData(imageData, 0, 0);
        };

        const intervalId = setInterval(drawFocusPeaking, 100);

        return () => {
            clearInterval(intervalId);
        };
    }, [videoRef, showFocusPeaking]);

    return <canvas ref={canvasRef} />;
}

export default FocusPeaking;
