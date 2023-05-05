
import Image from 'next/image'
import wandererLogo from '../../src/logotp.png'
import CheckIcon from '@mui/icons-material/Check';
import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';

// [
//     {
//         id: 1,
//         places: [{ name: "hanthana" }],
//         hotel: { name: "hanthana rest" }
//     },
//     {
//         id: 2,
//         places: [{ name: "sigiriya" }, { name: "kandalama" }],
//         hotel: { name: "sigiriya uga" }
//     },
//     {
//         id: 3,
//         places: [{ name: "nuwara eliya" }, { name: "ella" }],
//         hotel: { name: "ella tower" }
//     },
// ]
export default function generator() {
    const [plan, setPlan] = useState([])
    const [place, setPlace] = useState(true)
    const [prompt, setPrompt] = useState('')
    const [Cid, setCid] = useState(0);
    const [Cplaces, setCplaces] = useState(0);
    const [showRec, setShowRec] = useState(false);
    const [places, setPlaces] = useState([{ name: "sigiriya", country: "sri lanka" }, { name: "hanthana", country: "sri lanka" }])
    function RecommendedPlaces({ places }) {
        if (showRec) {
            return (
                <div>
                    <a onClick={() => { setShowRec(false) }}><ClearIcon /></a>
                    <h2 className="text-l font-bold mb-4">Recommended Places</h2>
                    <div className="grid grid-cols-5 gap-4">
                        {places.map((place, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 border-2 border-red-900 shadow">
                                <img src="http://127.0.0.1:8000/images/Beauty_of_Sigiriya_by_Binuka.jpg" alt={place.name} className="w-full h-20 object-cover mb-2 rounded-lg" />
                                <div>
                                    <h3 className="text-lg font-bold mb-2">{place.name}</h3>
                                    <p className="text-gray-600">{place.country}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        } else { return <div></div> }
    }
    function ChatPrompt({ onPrompt }) {
        const [inputValue, setInputValue] = useState('');

        async function handleSubmit() {
            setShowRec(true)
            console.log("rans")
            await axios.get('http://127.0.0.1:5000/get/' + inputValue)
                .then(function (response) {
                    console.log(response);
                    response.data.array.forEach(element => {
                        setPlaces([
                            ...places,
                            {
                                name: element,
                                country: 'sri lanka'
                            }
                        ])
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
            setInputValue('')
        };

        // let placeholder;
        // if (place) { placeholder = "Type your prompt for the place" }
        // else {
        //     placeholder = "Type your prompt for the hotel"
        // }


        return (
            <div className="fixed bottom-0 right-0 left-0 p-4 flex flex-col items-center" overflow="hidden">
                <RecommendedPlaces places={places} />
                <div className="max-w-m w-full bg-gray-50 shadow-md  rounded-md overflow-hidden">

                    <div className="p-4">


                        <input
                            type="text"

                            value={inputValue}
                            onChange={(event) => {
                                setInputValue(event.target.value)
                            }}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        <div className='flex'>
                            <div className='flex-item'>
                                <button

                                    className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"

                                    onClick={() => {
                                        handleSubmit()

                                    }}>
                                    <SendIcon />
                                </button></div>
                            <div className='flex-item ml-3'>
                                <button
                                    type="submit"
                                    className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"
                                    onClick={() => {
                                        setCid(Cid + 1)
                                        setPlan([
                                            ...plan,
                                            {
                                                id: Cid,
                                                places: [],
                                                hotel: ""
                                            }

                                        ])
                                    }}>
                                    Add Day
                                    <AddCircleOutlineIcon />

                                </button></div>
                            <div className='flex-item ml-3'>
                                <button
                                    type="submit"
                                    className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"
                                    onClick={() => {

                                        setPlace(true)
                                    }
                                    } >
                                    Add Place
                                    <AddCircleOutlineIcon />

                                </button></div>
                            <div className='flex-item ml-3'>
                                <button
                                    type="submit"
                                    className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"
                                    onClick={() => {
                                        setPlace(false)
                                    }}>
                                    Add Hotel
                                    <AddCircleOutlineIcon />

                                </button></div>
                            <div className='flex-item ml-3'>
                                <button
                                    type="submit"
                                    className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"
                                >

                                    <CheckIcon />

                                </button></div>
                            <div className='flex-item ml-3'>
                                <button
                                    type="submit"
                                    className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"
                                >

                                    <ClearIcon />

                                </button></div>
                        </div>

                    </div>
                </div></div>

        );
    };
    function Places({ places }) {

        const list = places.map((name) => <div className='flex p-1 shadow-md w-50 m-2 rounded bg-red-200'>
            <p className='text-black-600'>{name.name}</p>
        </div>)
        return (
            <div className='rounded p-1  shadow-md flex-row flex-1 w-100 bg-gray-50'>
                <div className='flex m2 w-50 rounded  '>
                    <p className='font-semibold font-sans'>Places</p>
                </div>
                {list}
            </div>
        )
    }
    function Day({ comp }) {


        return (
            <div className={`flex justify-start w-auto mb-4`}>

                <a className="h-8 w-8 rounded-full mr-4 font-mono font-bold" >
                    Day  {comp.id}
                </a>

                <div className={`p-3 rounded-lg  bg-gray-50 flex`}>

                    <Places places={comp.places} />
                    <div className='rounded p-1 ml-8  w-50 shadow-sm flex-row flex-1 bg-yellow-50'>
                        <div className='flex-row'>
                            <p className='font-semibold font-sans'>Hotel</p>
                            <p >{comp.hotel.name}</p>
                        </div>
                    </div>
                </div>

            </div>
        );
    };

    function Chat() {
        const chats = plan.map((comp) => {

            return (
                <Day comp={comp} />);
        })
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
                {chats}

            </div>
        );
    }
    return (

        <div className="pl-5 pr-5">
            <Chat />
            <ChatPrompt />
        </div>)
}