import React, { useRef, useState, useEffect } from 'react';
import FocusPeaking from './FocusPeaking';

export default function VideoPlayer({ showFocusPeaking, peakingColor = '#ff0000', sensitivity = 30 }) {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Make sure video loads correctly
        const video = videoRef.current;

        if (video) {
            const handleLoad = () => setIsLoaded(true);
            video.addEventListener('loadeddata', handleLoad);

            // Set src explicitly to ensure it loads
            video.src = process.env.PUBLIC_URL
                ? `${process.env.PUBLIC_URL}/exploreHD-Focus.mp4`
                : '/exploreHD-Focus.mp4';

            return () => {
                video.removeEventListener('loadeddata', handleLoad);
            };
        }
    }, []);

    return (
        <div className="relative w-[640px] h-[360px] bg-black">
            <video
                ref={videoRef}
                className="w-full h-full"
                controls
                playsInline
            />

            {isLoaded && videoRef.current && (
                <FocusPeaking
                    videoRef={videoRef}
                    showFocusPeaking={showFocusPeaking}
                    peakingColor={peakingColor}
                    sensitivity={sensitivity}
                />
            )}
        </div>
    );
}
