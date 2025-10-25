'use client';

import { useEffect, useState, useRef } from 'react';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hasPlayed = useRef(false);

    useEffect(() => {
        // Start playing the video when component mounts
        if (videoRef.current && !hasPlayed.current) {
            videoRef.current.play().catch((error) => {
                console.error('Error playing video:', error);
                // If video fails to play, hide the loading screen after a short delay
                setTimeout(() => {
                    handleVideoEnd();
                }, 1000);
            });
            hasPlayed.current = true;
        }
    }, []);

    const handleVideoEnd = () => {
        setIsLoading(false);
        // Add a small delay before hiding to ensure smooth transition
        setTimeout(() => {
            setIsVisible(false);
        }, 500);
    };

    const handleVideoError = () => {
        // If video fails to load, hide the loading screen
        handleVideoEnd();
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-700 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <video
                ref={videoRef}
                className="w-full h-full object-contain"
                onEnded={handleVideoEnd}
                onError={handleVideoError}
                onLoadStart={() => {
                    // Ensure video is ready
                    if (videoRef.current) {
                        videoRef.current.volume = 0;
                    }
                }}
                muted
                playsInline
                preload="auto"
            >
                <source src="/videos/loading-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
