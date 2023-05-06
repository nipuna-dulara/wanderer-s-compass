import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { query, where, getDocs, Firestore, collection } from "firebase/firestore";
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
export default function TravelPlansComponent() {
    const [places, setPlaces] = useState([]);
    const db = getFirestore(app);
    async function getresults() {
        const querySnapshot = await getDocs(collection(db, "Places"))
        querySnapshot.forEach((doc) => {
            console.log(doc.id)
            setPlaces(current => [...current, doc.data()])
        })
    }
    getresults()
    useEffect(() => {
        console.log("initialized")


    }, [])
    const travelPlans = [
        {
            title: 'Beach Getaway',
            description: 'Relax and unwind on pristine sandy beaches with crystal-clear waters.',
            image: 'beach-image.jpg'
        },
        {
            title: 'Mountain Expedition',
            description: 'Embark on a thrilling adventure and conquer majestic peaks.',
            image: 'mountain-image.jpg'
        },
        {
            title: 'Cultural Immersion',
            description: 'Immerse yourself in diverse cultures and experience vibrant city life.',
            image: 'city-image.jpg'
        }
    ];

    return (
        <div className='content-center w-fit'>
            {/* <p className='text-2xl font-bold'>places</p> */}

            <div className="flex overflow-x-scroll max-w-7xl space-x-4 p-4">
                {places.map((plan, index) => (
                    <div key={index} className="flex-shrink-0 w-64 bg-gray-200 rounded-lg p-4 flex flex-col justify-between">
                        <img src={`http://127.0.0.1:8000/images/${plan.image}`} alt={plan.name} className="object-cover w-full h-40 rounded-md mb-4" />
                        <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                        <p className="text-sm text-gray-700">{plan.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

