import React, { useState } from 'react'
import Header from './Header'

function Login() {
    const [signUp, setSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    console.log(formData);

    const toggleSignUp = () => {
        setSignUp(!signUp);
    }

  return (
    <div>
      <Header/>
      <div>
        <img src="https://analyticsindiamag.com/wp-content/uploads/2019/05/apps.55787.9007199266246365.687a10a8-4c4a-4a47-8ec5-a95f70d8852d.jpg" alt="logo" />
        <form action="" className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4 w-3/12 p-8 bg-black/60 rounded-lg'>
            <h1 className='text-white text-3xl font-bold'>{signUp ? "Sign Up" : "Sign In"}</h1>
            <hr className='w-full' />

            {signUp ? (
                <>
                    <input type="text" placeholder='Enter your name' className= 'p-2 m-2 w-full' name='name' value={formData.name} onChange={handleChange} />
                    <input type="text" placeholder='Email or phone number' className= 'p-2 m-2 w-full' name='email' value={formData.email} onChange={handleChange} />
                    <input type="password" placeholder='Password' className= 'p-2 m-2 w-full' name='password' value={formData.password} onChange={handleChange} />
                    <button type='submit' className= 'p-2 m-2 bg-red-700 text-white rounded-md w-full '>Sign Up</button>
                </>
            ) : (
                <>
                    <input type="text" placeholder='Email or phone number' className= 'p-2 m-2 w-full' name='email' value={formData.email} onChange={handleChange} />
                    <input type="password" placeholder='Password' className= 'p-2 m-2 w-full' name='password' value={formData.password} onChange={handleChange} />
                    <button type='submit' className= 'p-2 m-2 bg-red-700 text-white rounded-md w-full'>Login</button>
                </>

            )}
            <p className='text-gray-400'> OR </p>
            <button className='p-2 m-2 bg-white text-black rounded-md w-full'>Continue with Google</button>
            <span className='text-gray-400 text-sm text-center underline'>{signUp ? "" : "Forgot Password?"}</span>
            <p className='text-gray-400'>
                <span>
                    {signUp ? "Already have an account?" : "New to Netflix?"} <span className='text-white underline cursor-pointer' onClick={toggleSignUp}>{signUp ? "Sign In" : "Sign Up"}</span>
                </span>
            </p>
        </form>
      </div>
    </div>
  )
}

export default Login
