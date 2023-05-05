import { useState } from 'react';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
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
export default function AddPlaceForm() {
    const db = getFirestore(app);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setDoc(doc(db, "Places", name), {
            name: name,
            country: address,
            description: description,
            image: image.name
        })
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('image', image);

        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        setName('')
        setAddress('')
        setImage(null)
        setDescription('')
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focup-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                    Country
                </label>
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focup-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                    Tags (seperate with a space)
                </label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focup-2 w-full"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                    Image
                </label>
                <input
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focup-2 w-full"
                />
            </div>
            <button
                type="submit"
                className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800"
            >
                Add Place
            </button>
        </form>
    );
}
