import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactPhoto from "../assets/reactLogo.png"
import MongoPhoto from "../assets/MongoDbLogo.png"
import ExpressPhoto from "../assets/Ex-Logo.png"
import NodePhoto from "../assets/NodeJs_Logo.png"
import BgImage from "../assets/bgImage.png"

const Home = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('Home')
    const navLink = ['Home', 'About', 'Learn', 'ContactUs'];
    const Mern = ["MongoDB", "ExpressJS", "ReactJS", "NodeJS"];
    const LoginNav = () =>{
        navigate("/login");
    }
    const SignupNav = () =>{
        navigate("/signup")
    }   

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
                    onClick={LoginNav}
                    className=" px-2 py-1 mr-1 hover:underline bg-blue-600 text-white rounded-lg font-medium text-gray-400">
                        Login
                    </button>
                    <span className='text-blue-600 font-bold'>/</span>
                    <button 
                    onClick={SignupNav}
                    className=" px-2 py-1 ml-1 hover:underline bg-blue-600 text-white rounded-lg font-medium text-gray-400">
                        signUp
                    </button>
                </div>
            </div>
        </header>
        

        <main>
            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-pink-600/10 border-blue-500/20 flex justify-center items-center text-center p-3">
                <p className=" text-gray-400 font-bold text-lg italic max-w-2xl">
                    “The time will pass no matter what you do, so choose to spend it learning things that make you better.”
                </p>
            </div>
            <section className='bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-pink-600/10 border-blue-500/20 p-3 border-b'>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 place-items-center">

                    {/* MongoDB */}
                    <div className="flex flex-col items-center gap-6 w-full">
                        <img 
                            className="w-64 h-64 sm:w-44 sm:h-44 mt-4 xl:w-64 xl:h-64 object-cover rounded-full ring-4 ring-blue-500 hover:ring-green-500 ring-offset-4 ring-offset-gray-900 cursor-pointer hover:scale-105 transition duration-200 hover:shadow-[0_0_40px_#22c55e]" 
                            src={MongoPhoto} 
                            alt="MongoDB pic"
                        />
                        <pre className="bg-gray-900 text-green-400 p-6 rounded-xl text-left font-mono whitespace-pre-wrap text-lg w-full">
                            <span className="text-purple-400">db</span>.
                            <span className="text-yellow-300">users</span>.
                            <span className="text-green-400">insertOne</span>
                            {"({\n"}
                            {"  "}<span className="text-orange-400">name</span>:{" "}
                            <span className="text-green-300">"Mern"</span>,{"\n"}
                            {"  "}<span className="text-orange-400">role</span>:{" "}
                            <span className="text-green-300">"Developer"</span>{"\n"}
                            {"  )\n"}
                            {"}"}
                        </pre>
                    </div>

                    {/* ExpressJS */}
                    <div className="flex flex-col items-center gap-6 w-full">
                        <img 
                            className="w-64 h-64 sm:w-44 mt-4 sm:h-44 xl:w-64 xl:h-64 object-cover rounded-full ring-4 ring-blue-500 hover:ring-green-500 ring-offset-4 ring-offset-gray-900 cursor-pointer hover:scale-105 transition duration-200 hover:shadow-[0_0_40px_#22c55e]"
                            src={ExpressPhoto} 
                            alt="ExpressJs pic"
                        />
                        <pre className="bg-gray-900 text-green-400 p-6 rounded-xl text-left font-mono whitespace-pre-wrap text-lg w-full">
                            <span className="text-yellow-300">app</span>.
                            <span className="text-cyan-400">get</span>
                            {"("}
                            <span className="text-green-300">"/"</span>, (req, res) =&gt; {"{\n"}
                            {"  "}res.
                            <span className="text-cyan-400">send</span>
                            ({"\n"}
                            {"    "}
                            <span className="text-green-300">"Hello Express"</span>
                            {"\n"}
                            {"  )"}{"\n"}
                            {"})"}
                        </pre>
                    </div>

                    {/* React */}
                    <div className="flex flex-col items-center gap-6 w-full">
                        <img 
                            className="w-64 h-64 sm:w-44 mt-4 sm:h-44 xl:w-64 xl:h-64 object-cover rounded-full ring-4 ring-blue-500 hover:ring-green-500 ring-offset-4 ring-offset-gray-900 cursor-pointer hover:scale-105 transition duration-200 hover:shadow-[0_0_40px_#22c55e]"
                            src={ReactPhoto} 
                            alt="React pic"
                        />
                        <pre className="bg-gray-900 text-green-400 p-6 rounded-xl text-left font-mono whitespace-pre-wrap text-lg w-full">
                            <span className="text-purple-400">function</span>{" "}
                            <span className="text-yellow-300">App</span>()
                            {" {\n"}
                            {"  "}
                            <span className="text-purple-400">return</span>{" ("}{"\n"}
                            {"    "}
                            <span className="text-blue-400">&lt;h1&gt;</span>
                            Hello React
                            <span className="text-blue-400">&lt;/h1&gt;</span>
                            {"\n"}
                            {"  )\n"}
                            {"}"}
                        </pre>
                    </div>

                    {/* NodeJS */}
                    <div className="flex flex-col items-center gap-6 w-full">
                        <img
                            src={NodePhoto}
                            alt="NodeJs pic"
                            className="w-64 h-64 sm:w-44 mt-4 sm:h-44 xl:w-64 xl:h-64 object-cover rounded-full ring-4 ring-blue-500 hover:ring-green-500 ring-offset-4 ring-offset-gray-900 cursor-pointer hover:scale-105 transition duration-200 hover:shadow-[0_0_40px_#22c55e]"
                        />
                        <pre className="bg-gray-900 text-green-400 p-6 rounded-xl text-left font-mono whitespace-pre-wrap text-lg w-full">
                            <span className="text-purple-400">const</span>{" "}
                            <span className="text-yellow-300">http </span>
                            = require
                            {"("}
                            <span className="text-yellow-300">"http"</span>
                            {")"}
                            {"\n"}
                            <span className="text-yellow-300">http</span>.
                            <span className="text-cyan-400">createServer</span>
                            {"("}{"\n"}
                            {"(req, res) => {\n"}
                            {"  "}res.
                            <span className="text-cyan-400">end</span>
                            {"("}
                            <span className="text-green-300">"Hello Node"</span>
                            {")"}
                            {"\n"}
                            {"})."}
                            <span className="text-cyan-400">listen</span>
                            {"(3000)"}
                        </pre>
                    </div>

                </div>
            </section>
            <section>

            </section>
        </main>
        {/* <footer>
            <h4 className='text-white p-4'>Ab karo MERN stack interview ki taiyari</h4>
        </footer> */}
        
        

        <h1
            className="fixed top-0 left-1/2 -translate-x-1/2 text-xl font-bold text-purple-400 text-center
                    animate-[moveDown_7s_linear_infinite] pointer-events-none z-50"
            >
            
            Learn MERN the Smart Way - Interview-Focused Preparation
        </h1>
        <img src={BgImage} alt="bgImage"/>
    </div>
  )
}

export default Home