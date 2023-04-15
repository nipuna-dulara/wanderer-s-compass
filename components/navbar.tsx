import Image from 'next/image'
import wandererLogo from '../src/logotp.png'

export default function Navbar(){
    return (
        
<nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-red-700 dark:border-red-700 max-h-20">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
  <a href="https://flowbite.com/" className="flex items-center">
      <Image
                        src={wandererLogo}
                        width={200}
                        height={100} alt={'wanderlogo'}      />
   
  </a>
  <div className="flex md:order-2">
      <button type="button" className="text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 ">Get Yours</button>
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0  font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-white md:dark:bg-white dark:border-gray-700">
      <li>
        <a href="#" className="block  pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-700" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" className="block pl-3 pr-4 text-gray-900 rounded hover:bg-red-700 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-700 ">Places</a>
      </li>
      <li>
      <a href="#" className="block pl-3 pr-4 text-gray-900 rounded hover:bg-red-700 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-700 ">Hotels</a>      </li>
      <li>
      <a href="#" className="block pl-3 pr-4 text-gray-900 rounded hover:bg-red-700 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-700 ">Plans</a>      </li>
    </ul>
  </div>
  </div>
</nav>

    )
}