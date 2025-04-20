import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { addUser, removeUser } from '@/redux/login';
import { useDispatch } from 'react-redux';
import { TOAST_MESSAGE, IMAGE_URL, LOGIN_BUTTON, LANGUAGES } from '../utils/constant';
import { toggleGptSearch } from '@/redux/gptSlice';
import { setLanguage } from '@/redux/config';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const photoURL = useSelector((store) => store?.user?.user?.photoURL);
  const user = useSelector((store) => store?.user?.user?.displayName);
  const gptSearch = useSelector((store) => store.gpt.gptSearch);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/');
      toast.success(TOAST_MESSAGE.SIGN_OUT_SUCCESS);
    }).catch((error) => {
      // An error happened.
      toast.error(TOAST_MESSAGE.SIGN_OUT_ERROR, error);
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        navigate('/browse');
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleGptSearch = () => {
    // Toggle the gpt search component
    dispatch(toggleGptSearch());
  }

  return (
    <div className='absolute w-full p-4 z-10 flex justify-between items-center bg-gradient-to-b from-black to-transparent'>
      <img src={IMAGE_URL.HEADER_PROFILE_IMAGE} alt="logo" />
      {window.location.pathname === '/browse' && (
        <div className='flex flex-col items-center gap-2'>
        <div className='flex items-center gap-4'>
        <select className='p-2 rounded-md bg-black text-white' onChange={(e) => dispatch(setLanguage(e.target.value))}>
            {LANGUAGES.map((language) => (
              <option key={language.code} value={language.code}>{language.name}</option>
            ))}
          </select>
          <button className='bg-red-600 px-4 py-1 rounded-md text-white' onClick={handleGptSearch}>{gptSearch ? 'Browse Page' : 'GPT Search'}</button>
          <img src={photoURL || IMAGE_URL.HEADER_PHOTO_URL} alt="user" className='w-10 h-10 rounded-full border-2 border-gray-300' />
          <button className='bg-red-600 px-4 py-1 rounded-md text-white' onClick={() => handleSignOut()}>{LOGIN_BUTTON.SIGN_OUT}</button>
          
        </div>
        {!gptSearch &&
        <p className='text-white gradient-text text-lg'>Hi, {user}</p> }
        </div>
      )}
    </div>
  )
}

export default Header
