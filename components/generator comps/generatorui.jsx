import React from 'react';
import Image from 'next/image'
import wandererLogo from '../../src/logotp.png'

const Day = ({ id, message }) => {


    return (
        <div className={`flex justify-start mb-4`}>

            <a className="h-8 w-8 rounded-full mr-4">
                Day  {id}
            </a>

            <div className={`p-4 rounded-lg max-w-xs bg-gray-200`}>
                <p className="text-sm">{message}</p>
            </div>

        </div>
    );
};

export default function Chat() {
    return (
        <div className='mt-3'>
            <div className={`flex justify-end mb-4`}>

                <div className={`p-4 rounded-lg max-w-xs bg-red-700 text-white`}>
                    <p className="text-sm">Hi welcome to the Wanderer's compass</p>
                </div>

                <Image
                    className="h-10 w-10 rounded-full mr-4"
                    src={wandererLogo}
                    alt="User Avatar"
                />

            </div>
            <Day message="Hi there! How can I assist you today?" id="1" />
            <Day message="Can you help me with a tech problem?" id="2" />
            <Day message="Sure! What's the issue?" id="3" />
            <Day message="My computer won't turn on." id="4" />
            <Day message="Have you tried restarting it?" id="5" />
            <Day message="Yes, but it still won't turn on." id="6" />
            <Day message="My computer won't turn on." id="4" />
            <Day message="Have you tried restarting it?" id="5" />
            <Day message="Yes, but it still won't turn on." id="6" />
            <Day message="Hmm, let me look into it and get back to you." id="7" />
            <Day message="My computer won't turn on." id="4" />
            <Day message="Have you tried restarting it?" id="5" />
            <Day message="Yes, but it still won't turn on." id="6" />
            <Day message="Hmm, let me look into it and get back to you." id="7" />
            <Day message="Hmm, let me look into it and get back to you." id="7" />
        </div>
    );
}
