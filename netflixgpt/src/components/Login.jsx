import React, { useState } from 'react'
import Header from './Header'
import { validateName, validateEmail, validatePassword } from '../utils/validation';

function Login() {
    const [signUp, setSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError({
            ...error,
            [e.target.name]: validateFields(e.target.name, e.target.value),
        });
    }

    const validateFields = (field, value) => {
        switch (field) {
            case "name":
                return validateName(value);
            case "email":
                return validateEmail(value);
            case "password":
                return validatePassword(value);
            default:
                return "";
        }
    }

    const handleValidation = () => {
        const newError = {
            name: "",
            email: "",
            password: "",
        };
        if (signUp) {
            newError.name = validateFields("name", formData.name);
        }
        newError.email = validateFields("email", formData.email);
        newError.password = validateFields("password", formData.password);
        setError(newError);
        return Object.values(newError).every(error => typeof error === 'string' && error === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = handleValidation();
        if (isValid) {
            // Proceed with form submission
        } else {
            console.log("Form has errors:", error);
        }
    }

    const toggleSignUp = () => {
        setSignUp(!signUp);
        setFormData({
            name: "",
            email: "",
            password: "",
        });
        setError({
            name: "",
            email: "",
            password: "",
        });
    }

    return (
        <div>
            <Header/>
            <div>
                <img src="https://analyticsindiamag.com/wp-content/uploads/2019/05/apps.55787.9007199266246365.687a10a8-4c4a-4a47-8ec5-a95f70d8852d.jpg" alt="logo" className="w-full h-screen object-cover"/>
                <form onSubmit={handleSubmit} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center gap-4 w-3/12 p-8 bg-black/60 rounded-lg'>
                    <h1 className='text-white text-3xl font-bold'>{signUp ? "Sign Up" : "Sign In"}</h1>
                    <hr className='w-full' />

                    {signUp && (
                        <div className="w-full">
                            <input 
                                type="text" 
                                placeholder='Enter your name' 
                                className='p-2 m-2 w-full rounded-md focus:outline-none' 
                                name='name' 
                                value={formData.name} 
                                onChange={handleChange}
                            />
                            {error.name && <p className='text-red-500 text-sm px-2'>{error.name}</p>}
                        </div>
                    )}
                    
                    <div className="w-full">
                        <input 
                            type="text" 
                            placeholder='Email or phone number' 
                            className='p-2 m-2 w-full rounded-md focus:outline-none' 
                            name='email' 
                            value={formData.email} 
                            onChange={handleChange}
                        />
                        {error.email && <p className='text-red-500 text-sm px-2'>{error.email}</p>}
                    </div>

                    <div className="w-full">
                        <input 
                            type="password" 
                            placeholder='Password' 
                            className='p-2 m-2 w-full rounded-md focus:outline-none' 
                            name='password' 
                            value={formData.password} 
                            onChange={handleChange}
                        />
                        {error.password && <p className='text-red-500 text-sm px-2'>{error.password}</p>}
                    </div>

                    <button 
                        type='submit'
                        className='p-2 m-2 bg-red-700 text-white rounded-md w-full hover:bg-red-800'
                    >
                        {signUp ? "Sign Up" : "Login"}
                    </button>

                    <p className='text-gray-400 text-center'> OR </p>
                    <button 
                        type="button" 
                        className='p-2 m-2 bg-white text-black rounded-md w-full hover:bg-gray-100'
                    >
                        Continue with Google
                    </button>
                    
                    {!signUp && (
                        <span className='text-gray-400 text-sm text-center hover:underline cursor-pointer'>
                            Forgot Password?
                        </span>
                    )}
                    
                    <p className='text-gray-400 text-center'>
                        <span>
                            {signUp ? "Already have an account?" : "New to Netflix?"}{" "}
                            <span 
                                className='text-white hover:underline cursor-pointer' 
                                onClick={toggleSignUp}
                            >
                                {signUp ? "Sign In" : "Sign Up"}
                            </span>
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
