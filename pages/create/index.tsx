import CreateAccount from "@/components/createAccount";
import createAccount from "@/components/createAccount"
import { useState } from 'react';
import Image from "next/image";
import { useRouter } from "next/router";
import wandererLogo from '../../src/logotp.png'
import AddHotelForm from "@/components/addComponents/addHotel";
import AddPlaceForm from "@/components/addComponents/addPlaces";
export default function AddData() {
    const router = useRouter()
    const [isAddHotel, setIsAddHotel] = useState(true);

    const handleToggleClick = () => {
        setIsAddHotel(!isAddHotel);
    };

    return (
        <div className="flex flex-col items-center">
            <a href="#" className="flex items-center  text-2xl font-semibold text-gray-900 dark:text-white" onClick={() => { router.push('/') }}>
                <Image
                    src={wandererLogo}
                    width={150}
                    height={50} alt={'wanderlogo'}
                />

            </a>
            <div className="mb-4">
                <button
                    onClick={() => setIsAddHotel(true)}
                    className={`${isAddHotel ? 'bg-red-700 text-white' : 'bg-gray-300 text-gray-500'
                        } py-2 px-4 rounded-l hover:bg-red-800 hover:text-white`}
                >
                    Add Hotel
                </button>
                <button
                    onClick={() => setIsAddHotel(false)}
                    className={`${!isAddHotel ? 'bg-red-700 text-white' : 'bg-gray-300 text-gray-500'
                        } py-2 px-4 rounded-r hover:bg-red-800 hover:text-white`}
                >
                    Add Place
                </button>
            </div>
            {isAddHotel ? <AddHotelForm /> : <AddPlaceForm />}
        </div>
    );
}

