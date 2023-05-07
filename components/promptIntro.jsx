import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const IntroComponent = () => {
    const introRef = useRef(null);

    useEffect(() => {
        const options = {
            strings: [
                "Let's make that trip you always wanted to go, but don't no how a reality",
                "Tell us what you have in mind..",
                "What's your plan for the weekend...",


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
        <div className="text-left ">

            <p ref={introRef} className="text-xl font-mono text-gray-700"></p>
        </div>
    );
};

export default IntroComponent;