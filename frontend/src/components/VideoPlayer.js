import React, { useRef, useState, useEffect } from 'react';
import FocusPeaking from './FocusPeaking';

export default function VideoPlayer({ showFocusPeaking, peakingColor = '#ff0000', sensitivity = 30 }) {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);
    const [customVideo, setCustomVideo] = useState(null);

    useEffect(() => {
        // Make sure video loads correctly
        const video = videoRef.current;

        if (video) {
            const handleLoad = () => {
                setIsLoaded(true);
                setErrorLoading(false);
            };

            const handleError = () => {
                console.error("Error loading video file");
                setErrorLoading(true);
                setIsLoaded(false);
            };

            video.addEventListener('loadeddata', handleLoad);
            video.addEventListener('error', handleError);

            // Only set src if we don't have a custom video
            if (!customVideo) {
                try {
                    // Try multiple possible paths for the demo video
                    const possiblePaths = [
                        process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/exploreHD-Focus.mp4` : null,
                        '/public/exploreHD-Focus.mp4',
                        '/exploreHD-Focus.mp4',
                        '/frontend/public/exploreHD-Focus.mp4',
                        './exploreHD-Focus.mp4'
                    ].filter(Boolean);

                    // Set to the first path
                    if (possiblePaths.length > 0) {
                        video.src = possiblePaths[0];
                    }
                } catch (err) {
                    console.error("Error setting video source:", err);
                    setErrorLoading(true);
                }
            }

            return () => {
                video.removeEventListener('loadeddata', handleLoad);
                video.removeEventListener('error', handleError);
            };
        }
    }, [customVideo]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            setCustomVideo(videoUrl);

            if (videoRef.current) {
                videoRef.current.src = videoUrl;
                videoRef.current.load();
            }
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-[640px] h-[360px] bg-black">
                <video
                    ref={videoRef}
                    className="w-full h-full"
                    controls
                    playsInline
                    src={customVideo || undefined}
                />

                {isLoaded && videoRef.current && (
                    <FocusPeaking
                        videoRef={videoRef}
                        showFocusPeaking={showFocusPeaking}
                        peakingColor={peakingColor}
                        sensitivity={sensitivity}
                    />
                )}

                {errorLoading && !isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 text-white p-4 text-center">
                        <div>
                            <p className="mb-4">Could not load the demo video.</p>
                            <p>Please upload your own video file to continue:</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4">
                <label className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded cursor-pointer">
                    {customVideo ? "Change Video" : "Upload Video"}
                    <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                </label>
            </div>
        </div>
    );
}
