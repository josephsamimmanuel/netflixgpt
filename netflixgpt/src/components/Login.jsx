import { useState } from 'react'
import Header from './Header'
import { validateName, validateEmail, validatePassword } from '../utils/validation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IMAGE_URL, LOGIN_BUTTON, ERROR_MESSAGE, TOAST_MESSAGE } from '../utils/constant';

function Login() {
    const navigate = useNavigate();
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
            toast.success(TOAST_MESSAGE.GOOGLE_SIGN_IN_SUCCESS);
            
            // Optional: You can store additional user info or redirect here
            if (user) {
                // Handle successful sign-in
                // For example: redirect to home page or update UI
            }
        } catch (error) {
            let errorMessage = ERROR_MESSAGE.GOOGLE_SIGN_IN_ERROR;
            toast.error(errorMessage);
            switch (error.code) {
                case ERROR_MESSAGE.POPUP_CLOSED:
                    errorMessage = ERROR_MESSAGE.POPUP_CLOSED_MESSAGE;
                    toast.error(errorMessage);
                    break;
                case ERROR_MESSAGE.POPUP_BLOCKED:
                    errorMessage = ERROR_MESSAGE.POPUP_BLOCKED_MESSAGE;
                    toast.error(errorMessage);
                    break;
                case ERROR_MESSAGE.CANCELLED_POPUP_REQUEST:
                    errorMessage = ERROR_MESSAGE.CANCELLED_POPUP_REQUEST_MESSAGE;
                    toast.error(errorMessage);
                    break;
                case ERROR_MESSAGE.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL:
                    errorMessage = ERROR_MESSAGE.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL_MESSAGE;
                    toast.error(errorMessage);
                    break;
                default:
                    errorMessage = error.message;
            }
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
                        photoURL: IMAGE_URL.PHOTO_URL
                      }).then(() => {
                        // Profile updated!
                        toast.success(TOAST_MESSAGE.PROFILE_UPDATE_SUCCESS);
                        navigate('/browse');
                      }).catch((error) => {
                        // An error occurred
                        toast.error(TOAST_MESSAGE.PROFILE_UPDATE_ERROR);
                      });
                    if (userCredential) {
                        toast.success(TOAST_MESSAGE.SIGN_UP_SUCCESS);
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
                        toast.success(TOAST_MESSAGE.SIGN_IN_SUCCESS);
                    }
                }
            } catch (error) {                
                // Handle Firebase auth errors
                switch (error.code) {
                    case ERROR_MESSAGE.INVALID_CREDENTIAL:
                        toast.error(ERROR_MESSAGE.INVALID_CREDENTIAL_MESSAGE);
                        break;
                    case ERROR_MESSAGE.EMAIL_ALREADY_IN_USE:
                        toast.error(ERROR_MESSAGE.EMAIL_ALREADY_IN_USE_MESSAGE);
                        break;
                    case ERROR_MESSAGE.INVALID_EMAIL:
                        toast.error(ERROR_MESSAGE.INVALID_EMAIL_MESSAGE);
                        break;
                    case ERROR_MESSAGE.OPERATION_NOT_ALLOWED:
                        toast.error(ERROR_MESSAGE.OPERATION_NOT_ALLOWED_MESSAGE);
                        break;
                    case ERROR_MESSAGE.WEAK_PASSWORD:
                        toast.error(ERROR_MESSAGE.WEAK_PASSWORD_MESSAGE);
                        break;
                    case ERROR_MESSAGE.USER_NOT_FOUND:
                        toast.error(ERROR_MESSAGE.USER_NOT_FOUND_MESSAGE);
                        break;
                    case ERROR_MESSAGE.WRONG_PASSWORD:
                        toast.error(ERROR_MESSAGE.WRONG_PASSWORD_MESSAGE);
                        break;
                    case ERROR_MESSAGE.TOO_MANY_REQUESTS:
                        toast.error(ERROR_MESSAGE.TOO_MANY_REQUESTS_MESSAGE);
                        break;
                    case ERROR_MESSAGE.NETWORK_REQUEST_FAILED:
                        toast.error(ERROR_MESSAGE.NETWORK_REQUEST_FAILED_MESSAGE);
                        break;
                    case ERROR_MESSAGE.INVALID_LOGIN_CREDENTIALS:
                        toast.error(ERROR_MESSAGE.INVALID_LOGIN_CREDENTIALS_MESSAGE);
                        break;
                    default:
                        toast.error(error.message || ERROR_MESSAGE.DEFAULT_ERROR);
                }
            }
        } else {
            toast.error(TOAST_MESSAGE.FORM_ERROR);
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
                    src={IMAGE_URL.HEADER_LOGO}
                    alt="logo" 
                    className="w-full h-screen object-cover"
                />
                <form 
                    onSubmit={handleSubmit} 
                    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center gap-4 w-3/12 p-8 bg-black/60 rounded-lg'
                >
                    <h1 className='text-white text-3xl font-bold'>{signUp ? LOGIN_BUTTON.SIGN_UP : LOGIN_BUTTON.SIGN_IN}</h1>
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
                        {signUp ? LOGIN_BUTTON.SIGN_UP : LOGIN_BUTTON.SIGN_IN}
                    </button>

                    <p className='text-gray-400 text-center'> OR </p>
                    <button 
                        type="button" 
                        className='p-2 m-2 bg-white text-black rounded-md w-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2'
                        onClick={handleGoogleSignIn}
                    >
                        <img 
                            src={IMAGE_URL.GOOGLE_LOGO} 
                            alt="Google" 
                            className="w-5 h-5"
                        />
                        {LOGIN_BUTTON.SIGN_IN_WITH_GOOGLE}
                    </button>
                    
                    {!signUp && (
                        <span className='text-gray-400 text-sm text-center hover:underline cursor-pointer'>
                            {LOGIN_BUTTON.FORGOT_PASSWORD}
                        </span>
                    )}
                    
                    <p className='text-gray-400 text-center'>
                        <span>
                            {signUp ? LOGIN_BUTTON.ALREADY_HAVE_AN_ACCOUNT : LOGIN_BUTTON.NEW_TO_NETFLIX}{" "}
                            <span 
                                className='text-white hover:underline cursor-pointer' 
                                onClick={toggleSignUp}
                            >
                                {signUp ? LOGIN_BUTTON.SIGN_IN : LOGIN_BUTTON.SIGN_UP}
                            </span>
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
