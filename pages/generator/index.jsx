
import Image from 'next/image'
import wandererLogo from '../../src/logotp.png'
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { query, where, getDocs } from "firebase/firestore";
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import EditIcon from '@mui/icons-material/Edit';
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import appContext from '@/context/context';
import { useContext } from 'react';
import background from "../../src/background.png";
import DeleteIcon from '@mui/icons-material/Delete';
import IntroComponent from '../../components/promptIntro';

function FirstChatPrompt({ onPrompt }) {
    const Router = useRouter()
    const [inputValue, setInputValue] = useState('');
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const preferences = [
        "Beach",
        "City",
        "Mountains",
        "Adventure",
        "Culture",
        "Luxury",
        "Forest",
        "Elepants",
        "Cycling",
        "Hiking",
        "Sunset",
        "Nature",
        "WaterFall",
        "Ancient",
        "Religious"
    ];

    const TravelPreferences = () => {


        const handlePreferenceClick = (preference) => {
            if (selectedPreferences.includes(preference)) {
                setSelectedPreferences(selectedPreferences.filter((p) => p !== preference));
            } else {
                setSelectedPreferences([...selectedPreferences, preference]);
            }
        };

        return (
            <div className="flex flex-wrap gap-2 mt-4 mb-3">
                {preferences.map((preference) => (
                    <button
                        key={preference}
                        className={`px-4 py-2 rounded-full border-2 border-red-900 text-red-900 ${selectedPreferences.includes(preference)
                            ? "bg-red-100"
                            : "bg-gray-50"
                            }`}
                        onClick={() => handlePreferenceClick(preference)}
                    >
                        {preference}
                    </button>
                ))}
            </div>
        );
    };

    async function handleSubmit() {
        setInputValue(inputValue.toLowerCase())
        const stringArray = inputValue.split(" ");
        let i = 0;
        let days;
        stringArray.map((x) => {

            if (x == "days" || x == "day") {
                days = stringArray[i - 1];
            }
            i = i + 1;
        })
        selectedPreferences.forEach((x) => {
            setInputValue(inputValue.toLowerCase() + x);
        })
        console.log(days)
        await axios.get('http://127.0.0.1:5000/plan/' + inputValue)
            .then(function (response) {
                console.log(response);
                console.log(response.data.data)
                Router.push({
                    pathname: '/generator/' + response.data.data,

                })
            })
            .catch(function (error) {
                console.log(error);
            })
    };



    return (
        <div className="fixed bottom-1/4 right-0 left-0 p-4 flex flex-col items-center" overflow="hidden">
            <Image
                src={wandererLogo}
                width={200}
                alt="wandererlogo"
            />
            <div className="max-w-m w-full bg-gray-50 shadow-md  rounded-md overflow-hidden">

                <div className="p-4">
                    <IntroComponent />

                    <input
                        type="text"

                        value={inputValue}
                        onChange={(event) => {
                            setInputValue(event.target.value)
                        }}
                        className="w-full border border-red-900 focus:outline-none text-black border-gray-300 rounded-md p-2"
                    />
                    <br />
                    <TravelPreferences />
                    <div className='flex'>
                        <div className='flex-item'>
                            <button

                                className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"

                                onClick={() => {
                                    handleSubmit()

                                }}>
                                <SendIcon />
                            </button></div>


                    </div>

                </div>
            </div></div>

    );
};
export default FirstChatPrompt;