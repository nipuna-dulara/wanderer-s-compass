
import Image from 'next/image'
import wandererLogo from '../../src/logotp.png'
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { query, where, getDocs, getDoc } from "firebase/firestore";
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
const firebaseConfig = {
    apiKey: "AIzaSyBY4AltQX22w-OP39_Mhld1tZrNuXDRLwI",
    authDomain: "wanderers-compass.firebaseapp.com",
    projectId: "wanderers-compass",
    storageBucket: "wanderers-compass.appspot.com",
    messagingSenderId: "298133703818",
    appId: "1:298133703818:web:8c1c9640a3191c134e7173",
    measurementId: "G-3B8Z874FXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function generator() {
    const [plan, setPlan] = useState([])
    const [place, setPlace] = useState(true)
    const [showEdits, setShowEdits] = useState(false)
    const router = useRouter()
    const [prompt, setPrompt] = useState('')
    const [Cid, setCid] = useState(0);
    const [Cplaces, setCplaces] = useState(0);
    const [showRec, setShowRec] = useState(false);
    const [places, setPlaces] = useState([])
    const { Pid } = router.query;
    // const [once, setOnce] = useState(false);
    const [places2, setPlaces2] = useState([])
    const db = getFirestore(app);
    const context = useContext(appContext)
    //recomended places component
    async function getPlan() {
        const docSnap = await getDoc(doc(db, 'plans', Pid));

        let obj = docSnap.data().data


        var result = Object.keys(obj).map((key) => [obj[key]]);
        console.log(result)
        console.log(result[0][0].id)
        console.log(result[0][0].places[0])
        result.map((x) => {
            setPlan(current =>
                [...current,
                {
                    id: x[0].id,
                    places: x[0].places,
                    hotel: x[0].hotel
                }
                ]
            )

        })


    }
    useEffect(() => {

        getPlan()

    }, [])

    function RecommendedPlaces({ places }) {
        const [links, setLinks] = useState([])

        // async function link(place) {

        //     const q = query(collection(db, "Places"), where("name", "==", place.name));
        //     let l;
        //     const querySnapshot = await getDocs(q);
        //     querySnapshot.forEach((doc) => {
        //         if (links.length == 5) {
        //             setLinks([])
        //         }
        //         let k = doc.data();
        //         console.log(k.image)
        //         l = "http://127.0.0.1:8000/images/" + k.image

        //     })
        //     setLinks(current => [...current, l])
        // }

        // places.map((place) => {
        //     link(place)
        // })


        let i = -1;
        if (showRec) {

            return (
                <div>
                    <a onClick={() => { setShowRec(false); setPlaces([]) }}><ClearIcon /></a>
                    <h2 className="text-l font-bold mb-4">Recommended Places</h2>
                    <div className="grid grid-cols-5 gap-4">
                        {places.map((place, index) => {


                            return (<div key={index} className="bg-white rounded-lg p-2 hover:border-4 border-2 border-red-900 shadow" onClick={async () => {
                                const q = query(collection(db, "Places"), where("name", "==", place.name));
                                let k
                                const querySnapshot = await getDocs(q);
                                querySnapshot.forEach((doc) => {
                                    k = doc.data();
                                })
                                console.log('here')
                                console.log(k)
                                if (place) {

                                    console.log(place)
                                    console.log(Cid)
                                    setPlan(
                                        plan.map((c) => {

                                            if (c.id == Cid) {
                                                return {
                                                    id: plan[Cid - 1].id,
                                                    places: [...plan[Cid - 1].places, k],
                                                    hotel: plan[Cid - 1].hotel

                                                }
                                            } else {
                                                return c
                                            }
                                        })
                                    )
                                    console.log(plan)
                                    setPlaces([])
                                    setShowRec(false)
                                    setCid(plan.length)

                                }
                            }}>
                                <img src={`http://127.0.0.1:8000/images/${place.image}`} alt={place.name} className="w-full h-20 object-cover mb-2 rounded-lg" />

                                <div>
                                    <h3 className="text-lg font-bold mb-2">{place.name}</h3>
                                    <p className="text-gray-600">{place.country}</p>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
            )
        } else { return <div></div> }
    }

    //chat prompt component
    function ChatPrompt({ onPrompt }) {
        const [inputValue, setInputValue] = useState('');
        const fetchPlaceData = async () => {
            try {
                const updatedPlaces = await Promise.all(
                    places.map(async (place) => {
                        const q = query(collection(db, 'Places'), where('name', '==', place.name));
                        const querySnapshot = await getDocs(q);
                        querySnapshot.forEach((doc) => {
                            place = { ...place, ...doc.data() };
                        });
                        return place;
                    })
                );

                setPlaces2(updatedPlaces);
            } catch (error) {
                console.log(error);
            }
        };

        if (places.length > 0) {
            fetchPlaceData();
        }
        // useEffect(() => {
        //     const fetchPlaceData = async () => {
        //         try {
        //             const updatedPlaces = await Promise.all(
        //                 places.map(async (place) => {
        //                     const q = query(collection(db, 'Places'), where('name', '==', place.name));
        //                     const querySnapshot = await getDocs(q);
        //                     querySnapshot.forEach((doc) => {
        //                         place = { ...place, ...doc.data() };
        //                     });
        //                     return place;
        //                 })
        //             );

        //             setPlaces2(updatedPlaces);
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     };

        //     if (places.length > 0) {
        //         fetchPlaceData();
        //     }
        // }, [places, db]);

        async function handleSubmit() {
            if (place) {
                setCplaces(Cplaces + 1);
            }
            console.log("rans")
            await axios.get('http://127.0.0.1:5000/get/' + inputValue)
                .then(function (response) {
                    console.log(response);
                    response.data.data.forEach(element => {
                        console.log(element)
                        setPlaces(current => [
                            ...current,
                            {
                                name: element,
                                country: 'sri lanka'
                            }


                        ])

                    });
                })
                .catch(function (error) {
                    console.log(error);
                })




            setInputValue('')
            setShowRec(true)

        };

        // let placeholder;
        // if (place) { placeholder = "Type your prompt for the place" }
        // else {
        //     placeholder = "Type your prompt for the hotel"
        // }


        return (
            <div className="fixed bottom-0 right-0 left-0 p-4 flex flex-col items-center" overflow="hidden">
                <RecommendedPlaces places={places2} />
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
                                                id: Cid + 1,
                                                places: [],
                                                hotel: "Sample"
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
                                    onClick={() => {
                                        if (!showEdits) {
                                            setShowEdits(true)
                                        } else {
                                            setShowEdits(false)
                                        }

                                    }
                                    } >

                                    {(!showEdits) ? <EditIcon /> : <DoneAllIcon />}

                                </button></div>
                            <div className='flex-item ml-3'>
                                <button
                                    type="submit"
                                    className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"
                                    onClick={async () => {
                                        console.log("fuck");
                                        try {
                                            const docRef = await addDoc(collection(db, "plans"), {
                                                auther: context.nameContext,
                                                data: Object.assign({}, plan)
                                            }).then((doc) => {
                                                console.log(doc)
                                            })
                                        } catch (error) {
                                            console.log(error)
                                        }

                                    }} >

                                    <CheckIcon />

                                </button></div>
                            <div className='flex-item ml-3'>
                                <button
                                    type="submit"
                                    className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"
                                    onClick={() => {
                                        router.push('/');
                                    }}>

                                    <ClearIcon />

                                </button></div>

                        </div>

                    </div>
                </div></div>

        );
    };
    //places components
    function Places({ places, id }) {
        const [, updateState] = React.useState();
        const forceUpdate = React.useCallback(() => updateState({}), []);
        const list = places.map((name) => {
            if (name.name != "Deleted") {
                return <div className='flex p-1 shadow-md w-50 m-2 rounded bg-red-200' >
                    <p className='text-black-600 flex'>{name.name}</p>
                    {showEdits && <button className='flex float-right w-4' onClick={() => {
                        console.log("ran")
                        setPlan(
                            plan.map((x) => {

                                if (x.id == id) {

                                    return {
                                        id: x.id,
                                        places: x.places.map((place) => {
                                            console.log(place.name + ' ' + name.name)
                                            if (place.name != name.name) {
                                                return place;
                                            } else {
                                                return { name: "Deleted" }
                                            }
                                        }),
                                        hotel: x.hotel

                                    }

                                } else {
                                    return x
                                }
                            })

                        )
                        console.log(plan)
                        // forceUpdate;
                    }
                    } ><DeleteIcon /></button>}
                </div>
            } else {
                return <div></div>
            }
        })
        return (
            <div className='rounded p-1  shadow-md flex-col flex-1 w-100 bg-gray-50'>
                <div className='flex m2 w-50 rounded  '>
                    <p className='font-semibold font-sans'>Places</p>
                </div>
                {list}
                {showEdits && <a className='flex' onClick={() => { setCid(id) }}><AddCircleOutlineIcon></AddCircleOutlineIcon></a>}
            </div>
        )
    }


    //day component
    function Day({ comp }) {


        return (
            <div className={`flex justify-start w-auto mb-4`}>

                <a className="h-12 w-11 rounded mr-4 bg-gray-800 justify-center text-center content-center text-white font-mono font-bold" >
                    Day  {comp.id}
                </a>

                <div className={`pl-3 pr-3 pb-4rounded-lg w-9/12 flex`}>

                    <Places places={comp.places} id={comp.id} />
                    <div className='rounded p-1 ml-8  w-100 shadow-md flex-row flex-1 bg-gray-50'>
                        <div className='flex-row'>
                            <p className='font-semibold font-sans'>Hotel</p>
                            <p >TBI</p>
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

            <div className='  bg-gradient-to-r from-white to-red-200' >
                <div className={`flex justify-end mt-3 mb-4`} style={{ backgroundImage: `url(${background})` }}>

                    <div className={`p-4 rounded-lg max-w-xs bg-red-700 text-white`}>
                        <p className="text-sm">Here's what we have generated for you! 🤩</p>
                    </div>

                    <Image
                        className="h-10 w-10 rounded-full mr-4"
                        src={wandererLogo}
                        alt="User Avatar"
                    />

                </div>
                {chats}
                <div className={`flex mr-3 justify-end mb-4`} style={{ backgroundImage: `url(${background})` }}>

                    <div className={`p-4 rounded-lg max-w-xs bg-red-700 text-white`}>
                        <p className="text-sm">You Can customize your travel plan. </p>
                    </div>

                    <Image
                        className="h-10 w-10 rounded-full mr"
                        src={wandererLogo}
                        alt="User Avatar"
                    />

                </div>
                <br />
                <br />
                <br /><br /><br />
                <br /><br /><br /><br /><br /><br />
            </div>
        );
    }
    return (

        <div className="pl-5 " >
            <Chat />
            <ChatPrompt />
        </div>)
}