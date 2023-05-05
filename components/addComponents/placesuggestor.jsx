import { useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

// const db = getFirestore(app);
// var suggestedPlaces = []
// const querySnapshot = await getDocs(collection(db, "Places"));
// console.log("ran");
// querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//     suggestedPlaces.push(doc.id.toString())
// });
const suggestedPlaces = [
    'New York City',
    'Los Angeles',
    'San Francisco',
    'Chicago',
    'Miami',
    'Seattle',
    'Austin',
    'Boston',
];

const PlaceSuggestion = ({ place, handleClick }) => {
    return (
        <li
            className="cursor-pointer hover:bg-gray-100 py-1 px-4"
            onClick={() => handleClick(place)}
        >
            {place}
        </li>
    );
};

const PlaceSuggester = () => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value.length > 0) {
            const filteredSuggestions = suggestedPlaces.filter((place) =>
                place.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

    const handleSuggestionClick = (place) => {
        setInputValue(place);
        setSuggestions([]);
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focup-2 w-full"
            />
            {isFocused && suggestions.length > 0 && (
                <ul className="absolute top-12 left-0 right-0 bg-white border border-gray-400 rounded-lg shadow-md">
                    {suggestions.map((place, index) => (
                        <PlaceSuggestion
                            key={index}
                            place={place}
                            handleClick={handleSuggestionClick}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlaceSuggester;