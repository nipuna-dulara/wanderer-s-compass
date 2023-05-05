import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendIcon from '@mui/icons-material/Send';
const ChatPrompt = ({ onPrompt }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onPrompt(inputValue);
        setInputValue('');
    };

    return (
        <div className="fixed bottom-0 right-0 left-0 p-4 flex flex-col items-center" overflow="hidden">
            <div className="max-w-m w-full bg-white shadow-md rounded-md overflow-hidden">

                <div className="p-4">
                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            placeholder="Type your prompt"
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        <div className='flex'>
                            <div className='flex-item'>
                                <button
                                    type="submit"
                                    className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    <SendIcon />
                                </button></div>
                            <div className='flex-item ml-3'>
                                <button
                                    type="submit"
                                    className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    Add Day
                                    <AddCircleOutlineIcon />

                                </button></div>
                            <div className='flex-item ml-3'>
                                <button
                                    type="submit"
                                    className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    Add Place
                                    <AddCircleOutlineIcon />

                                </button></div>
                            <div className='flex-item ml-3'>
                                <button
                                    type="submit"
                                    className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    Add Hotel
                                    <AddCircleOutlineIcon />

                                </button></div>
                        </div>
                    </form>
                </div>
            </div></div>

    );
};

export default ChatPrompt;