import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { addUser, removeUser } from '@/redux/login';
import { useDispatch } from 'react-redux';
import { TOAST_MESSAGE, IMAGE_URL, LOGIN_BUTTON } from '../utils/constant';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const photoURL = useSelector((store) => store?.user?.user?.photoURL);
  const user = useSelector((store) => store?.user?.user?.displayName);
  console.log(user);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/');
      toast.success(TOAST_MESSAGE.SIGN_OUT_SUCCESS);
    }).catch((error) => {
      // An error happened.
      toast.error(TOAST_MESSAGE.SIGN_OUT_ERROR);
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

  return (
    <div className='absolute w-full p-4 z-10 flex justify-between items-center bg-gradient-to-b from-black to-transparent'>
      <img src={IMAGE_URL.HEADER_PROFILE_IMAGE} alt="logo" />
      {window.location.pathname === '/browse' && (
        <div className='flex flex-col items-center gap-2'>
        <div className='flex items-center gap-4'>
          <img src={photoURL || IMAGE_URL.HEADER_PHOTO_URL} alt="user" className='w-10 h-10 rounded-full' />
          <button className='bg-red-600 px-4 py-1 rounded-md text-white' onClick={() => handleSignOut()}>{LOGIN_BUTTON.SIGN_OUT}</button>
          
        </div>
        <p className='text-red-600 gradient-text text-lg'>Hi, {user}</p>
        </div>
      )}
    </div>
  )
}

export default Header
