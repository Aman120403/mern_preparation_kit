import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactPhoto from "../assets/reactLogo.png"
import MongoPhoto from "../assets/MongoDbLogo.png"
import ExpressPhoto from "../assets/Ex-Logo.png"
import NodePhoto from "../assets/NodeJs_Logo.png"


const Home = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('Home')
    const navLink = ['Home', 'About', 'Learn', 'ContactUs']

  return (
    <div className='min-h-screen bg-gray-950 flex flex-col'>
        <header className="bg-gray-900 border-b border-gray-900 sticky top-0 z-20">
            <div className="px-6 py-3 flex items-center justify-between">
                <h1 className=" text-lg font-bold text-blue-400">MERN PREPARATION KIT</h1>
                <nav className='hidden md:flex items-center gap-4 '>
                    {navLink.map((nav) => (
                        <button
                        key={nav}
                        onClick={()=>setActiveNav(nav)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200
                        ${activeNav === nav
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                    `}
                        >
                            {nav}
                        </button>
                    ))}
                </nav>

                <div >
                    <button 
                    onClick={()=>navigate("/login")}
                    className=" px-2 py-1 hover:underline hover:bg-blue-600 hover:text-white rounded-lg font-medium text-gray-400">
                        Login
                    </button>
                    <span className='text-gray-400 font-bold'>/</span>
                    <button 
                    onClick={()=>navigate("/signup")}
                    className=" px-2 py-1 hover:underline hover:bg-blue-600 hover:text-white rounded-lg font-medium text-gray-400">signUp</button>
                </div>
            </div>
        </header>
        
        <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-pink-600/10 border-blue-500/20 p-3 flex justify-center items-center text-center">
            <p className=" text-gray-400 font-bold text-lg italic max-w-2xl">
                “The time will pass no matter what you do, so choose to spend it learning things that make you better.”
            </p>
        </div>
        <main className="flex items-center justify-between ">
            <img 
                className="w-64 h-64 object-cover rounded-full ring-4 ring-blue-500 hover:ring-green-500 ring-offset-4 ring-offset-gray-900
                m-4 cursor-pointer hover:scale-105 transition duration-200 hover:shadow-[0_0_40px_#22c55e]" 
                src={MongoPhoto} 
                alt="MongoDB pic"/>
            <span className="text-7xl font-extrabold text-cyan-400">
                +
            </span>    
            
            <img 
                className="w-64 h-64 object-cover rounded-full ring-4 ring-blue-500 hover:ring-green-500 ring-offset-4 ring-offset-gray-900
                m-4 cursor-pointer hover:scale-105 transition duration-200 hover:shadow-[0_0_40px_#22c55e]"
                src={ExpressPhoto} 
                alt="ExpressJs pic"/>
            <span className="text-7xl font-extrabold  text-cyan-400">
                +
            </span>
            <img 
                className="w-64 h-64 object-cover rounded-full ring-4 ring-blue-500 hover:ring-green-500 ring-offset-4 ring-offset-gray-900
                m-4 cursor-pointer hover:scale-105 transition duration-200 hover:shadow-[0_0_40px_#22c55e]"
                src={ReactPhoto} 
                alt="react pic"/>
            <span className="text-7xl font-extrabold text-cyan-400">
                +
            </span>
           <img
                src={NodePhoto}
                alt="NodeJs pic"
                className="w-64 h-64 object-cover rounded-full ring-4 ring-blue-500 hover:ring-green-500 ring-offset-4 ring-offset-gray-900
                m-5 cursor-pointer hover:scale-105 transition duration-200 hover:shadow-[0_0_40px_#22c55e]"

            />
        </main>
        

        <h1
  className="fixed top-0 left-1/2 -translate-x-1/2
             text-xl font-bold text-purple-400 text-center
             animate-[moveDown_7s_linear_infinite]
             pointer-events-none z-50"
>
  Learn MERN the Smart Way - Interview-Focused Preparation
</h1>
    </div>
  )
}

export default Home