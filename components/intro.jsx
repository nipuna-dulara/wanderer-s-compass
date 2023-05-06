import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const IntroComponent = () => {
    const introRef = useRef(null);

    useEffect(() => {
        const options = {
            strings: [
                "Welcome to Wanderer's Compass, your AI-powered travel companion!",
                "We create personalized travel plans based on your preferences, even if you're unsure where to go.",
                "Whether it's a serene beach getaway or an adrenaline-fueled adventure, our AI technology curates extraordinary experiences just for you.",
                "Customize your journey and embark on a tailor-made adventure with Wanderer's Compass as your trusted guide.",
                "Start exploring now!"
            ],
            typeSpeed: 0.5,
            backSpeed: 0.2,
            loop: true
        };

        const typed = new Typed(introRef.current, options);

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <div className="text-center py-8">
            <h1 className="text-3xl  font-bold mb-4">Welcome to Wanderer's Compass</h1>
            <p ref={introRef} className="text-xl font-mono text-gray-700"></p>
        </div>
    );
};

export default IntroComponent;