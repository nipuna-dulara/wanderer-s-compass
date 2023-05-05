import Image from 'next/image'
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { useState } from 'react';
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';
import { useContext } from 'react';
import appContext from '@/context/context';
import { query, where, getDocs } from "firebase/firestore";
import wandererLogo from '../src/logotp.png'
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

async function signIn(username: string, password: string) {
    const db = getFirestore(app);
}

//component 
export default function SignIN() {
    const [usernm, setUsernm] = useState('')
    const [psswrd, setPsswrd] = useState('')
    const [cookies, setCookie] = useCookies(['user'])
    const context = useContext(appContext);
    const router = useRouter()
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
    async function signinHandler(username: string, password: string) {
        const db = getFirestore(app);
        const q = query(collection(db, "users"), where("username", "==", username));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            console.log(doc.id, " => ", doc.data());
            let k = doc.id;
            if (password == doc.data().password) {
                try {
                    setCookie('user', k, { path: '/' });
                    context.setNameContext(k)
                } catch (e) {
                    console.error("load wennh", e)
                }
                router.push('/')
            }
        }
        );

    }
    return (<div>
        <section className="bg-gray-50 dark:bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <Image
                        src={wandererLogo}
                        width={200}
                        height={100} alt={'wanderlogo'}
                    />
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" onChange={(event) => { setUsernm(event.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" onChange={(event) => { setPsswrd(event.target.value) }} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => { signinHandler(usernm, psswrd) }}>Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => { router.push('/signup') }} >Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>)
}