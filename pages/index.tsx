import Image from 'next/image'
import { Inter } from 'next/font/google'
import wandererLogo from '../src/logotp.png'
import Navbar from '@/components/navbar'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar/>

      <div className="relative flex place-items-center before:absolute before:h-[400px] before:w-[680px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-yellow-200 after:via-yellow-100 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-yellow-950/10 after:dark:from-yellow-300 after:dark:via-yellow-200/40 before:lg:h-[400px]">
        <Image
          className=""
          src={wandererLogo}
          alt="wanderer logo"
          width={400}
          height={37}
          priority
        />
      </div>

     
    </main>
  )
}
