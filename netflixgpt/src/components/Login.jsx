import { useState } from 'react'
import Header from './Header'
import { validateName, validateEmail, validatePassword } from '../utils/validation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Login() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    console.log('user', user);
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

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            const result = await signInWithPopup(auth, provider);
            
            // The signed-in user info
            const user = result.user;
            console.log('Google Sign-in successful:', user);
            toast.success('Google Sign-in successful');
            
            // Optional: You can store additional user info or redirect here
            if (user) {
                // Handle successful sign-in
                // For example: redirect to home page or update UI
            }
        } catch (error) {
            let errorMessage = "Failed to sign in with Google. Please try again.";
            toast.error(errorMessage);
            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    errorMessage = "Sign-in popup was closed. Please try again.";
                    toast.error(errorMessage);
                    break;
                case 'auth/popup-blocked':
                    errorMessage = "Sign-in popup was blocked. Please enable popups for this site.";
                    toast.error(errorMessage);
                    break;
                case 'auth/cancelled-popup-request':
                    errorMessage = "Multiple popup requests were cancelled.";
                    toast.error(errorMessage);
                    break;
                case 'auth/account-exists-with-different-credential':
                    errorMessage = "An account already exists with the same email address but different sign-in credentials.";
                    toast.error(errorMessage);
                    break;
                default:
                    errorMessage = error.message;
            }
            console.error("Google Sign-in Error:", error.code, error.message);
            toast.error(errorMessage);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = handleValidation();
        
        if (isValid) {
            try {
                if (signUp) {
                    // Sign Up
                    const userCredential = await createUserWithEmailAndPassword(
                        auth, 
                        formData.email, 
                        formData.password
                    );
                    updateProfile(userCredential.user, {
                        displayName: formData.name, 
                        photoURL: "https://cdn-icons-png.flaticon.com/512/3001/3001758.png"
                      }).then(() => {
                        // Profile updated!
                        toast.success('Profile updated successfully');
                        navigate('/browse');
                      }).catch((error) => {
                        // An error occurred
                        toast.error('Error updating profile');
                      });
                    if (userCredential) {
                        console.log('User created successfully:', userCredential.user);
                        toast.success('User created successfully');
                        setSignUp(false);
                        setFormData({
                            name: "",
                            email: "",
                            password: "",
                        });
                    }
                } else {
                    // Sign In
                    const userCredential = await signInWithEmailAndPassword(
                        auth, 
                        formData.email, 
                        formData.password
                    );
                    if (userCredential) {
                        navigate('/browse');
                        toast.success('User signed in successfully');
                    }
                }
            } catch (error) {
                console.log('error:-', error);
                
                // Handle Firebase auth errors
                switch (error.code) {
                    case 'auth/invalid-credential':
                        toast.error('Please check your credentials.');
                        break;
                    case 'auth/email-already-in-use':
                        toast.error('This email is already registered.');
                        break;
                    case 'auth/invalid-email':
                        toast.error('Invalid email format. Please enter a valid email.');
                        break;
                    case 'auth/operation-not-allowed':
                        toast.error('Email/password sign in is not enabled. Please contact support.');
                        break;
                    case 'auth/weak-password':
                        toast.error('Password is too weak. Please choose a stronger password.');
                        break;
                    case 'auth/user-not-found':
                        toast.error('No account found with this email. Please sign up.');
                        break;
                    case 'auth/wrong-password':
                        toast.error('Incorrect password. Please try again.');
                        break;
                    case 'auth/too-many-requests':
                        toast.error('Too many failed attempts. Please try again later.');
                        break;
                    case 'auth/network-request-failed':
                        toast.error('Network error. Please check your internet connection.');
                        break;
                    case 'auth/invalid-login-credentials':
                        toast.error('Invalid login credentials. Please check your email and password.');
                        break;
                    default:
                        toast.error(error.message || 'An error occurred. Please try again.');
                }
            }
        } else {
            console.log("Form has errors:", error);
            toast.error("Please fix all form errors before submitting");
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
                <img 
                    src="https://analyticsindiamag.com/wp-content/uploads/2019/05/apps.55787.9007199266246365.687a10a8-4c4a-4a47-8ec5-a95f70d8852d.jpg" 
                    alt="logo" 
                    className="w-full h-screen object-cover"
                />
                <form 
                    onSubmit={handleSubmit} 
                    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center gap-4 w-3/12 p-8 bg-black/60 rounded-lg'
                >
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
                        className='p-2 m-2 bg-red-700 text-white rounded-md w-full hover:bg-red-800 transition-colors'
                    >
                        {signUp ? "Sign Up" : "Sign In"}
                    </button>

                    <p className='text-gray-400 text-center'> OR </p>
                    <button 
                        type="button" 
                        className='p-2 m-2 bg-white text-black rounded-md w-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2'
                        onClick={handleGoogleSignIn}
                    >
                        <img 
                            src="https://www.google.com/favicon.ico" 
                            alt="Google" 
                            className="w-5 h-5"
                        />
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
