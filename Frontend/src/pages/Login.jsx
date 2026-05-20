import React, { use, useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Signup from './Signup'
import axiosInstance from '../api/axios'


const Login = () => {
    const navigate=useNavigate()
    
    useEffect(()=>{
        console.log("rendered");
    })
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        // console.log(formData);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');
            console.log('calling apoiass')

            const response = await axiosInstance.post(
                '/auth/login',
                formData
            );
                  console.log('calling apoiass dine')
            //This code sends a POST request from the React frontend to the login API using Axios.
            //The formData object is automatically sent as the request body, and Axios combines the endpoint with the configured baseURL.
            //The backend receives the credentials through req.body, validates the user, and returns a response which is stored in the response object.”
            console.log("response datasss : ", response.data);

            navigate('/dashboard');

        } catch (error) {
              console.log('calling apoiass cdatcyh')

           // console.log(error.response?.data);
            console.log('Full error bklas:', error)
            console.log('Response data:', error.response?.data)
            console.log('Message:', error.response?.data?.message)

            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gray-950 flex items-center justify-center px-4 text-white'>
            <div className='w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-8'>
                <div className="mb-4 text-center ">
                    {/* Header */}
                    <h1 className="text-3xl  font-bold text-white">MERN Prep Kit</h1>
                    <p className="text-gray-400 mt-2">Login to continue learning</p>
                </div>
                {/* Error Message */}
                {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
                    {error}
                </div>
                )}
                  {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/*Email*/}
                    <div>
                        <label className='block text-sm text-gray-400 mb-1'>Email</label>
                        <input 
                            type="email"
                            name= "email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email like - john@example.com"
                            required
                            className='w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 placeholder-gray-500'
                        />
                    </div>
                     {/* Password */}
                    <div>
                        <label className='block text-sm text-gray-400 mb-1'>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 placeholder-gray-500"
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading? "Logged in...":"Login"}
                    </button>
                </form>
                {/* Footer*/}
                <p className = "text-center text-gray-500 text-sm mt-6">Don't have an account?{' '}
                    <Link to="/Signup" className="text-blue-400 hover:underline">
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login