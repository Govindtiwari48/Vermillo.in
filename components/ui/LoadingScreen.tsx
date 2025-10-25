'use client';

import { useState, useEffect } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Start the rolling animation after a short delay
        const animationTimer = setTimeout(() => {
            setAnimationComplete(true);
        }, 500); // Start animation after 0.5s

        // Start fade out after 2.5 seconds
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 2500);

        // Hide loading screen after 3 seconds total
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
            onComplete();
        }, 3000);

        return () => {
            clearTimeout(animationTimer);
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className="text-center">
                <div className="rolling-text-container">
                    {['V', 'E', 'R', 'M', 'I', 'L', 'L', 'O'].map((letter, index) => (
                        <span
                            key={index}
                            className={`rolling-letter ${animationComplete ? 'animate-roll' : ''}`}
                            style={{
                                animationDelay: `${index * 0.08}s`,
                                animationDuration: '0.6s',
                            }}
                        >
                            {letter}
                        </span>
                    ))}
                </div>
                <div className="mt-12">
                    <div className="loading-dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
                {/* <div className="mt-6">
                    <p className="text-sm text-gray-500 font-light tracking-wider">
                        WEARABLE ART DEFINED
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default LoadingScreen;
