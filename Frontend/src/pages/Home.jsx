import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('Home')
    const navLink = ['Home', 'About', 'Learn', 'ContactUs']

  return (
    <div className='min-h-screen bg-gray-950 flex flex-col'>
        <header className="bg-gray-900 border-b border-gray-900">
            <div className="px-6 py-3 flex items-center justify-between">
                <h1 className=" text-lg font-bold text-blue-400">MERN PREP KIT</h1>
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
        <div className="p-3 border-b border-gray-800 flex justify-center items-center text-center">
            <p className="text-gray-400 font-bold text-lg italic max-w-2xl">
                “The time will pass no matter what you do, so choose to spend it learning things that make you better.”
            </p>
        </div>
    </div>
  )
}

export default Home