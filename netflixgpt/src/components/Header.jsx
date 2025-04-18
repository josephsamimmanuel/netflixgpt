import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

function Header() {
  const navigate = useNavigate();
  const photoURL = useSelector((store) => store?.user?.user?.photoURL);
  const user = useSelector((store) => store?.user?.user?.displayName);
  console.log(user);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/');
      toast.success('Signed out successfully');
    }).catch((error) => {
      // An error happened.
      toast.error('Error signing out');
    });
  }
  return (
    <div className='absolute w-full p-4 z-10 flex justify-between items-center bg-gradient-to-b from-black to-transparent'>
      <img src="https://s22.q4cdn.com/959853165/files/design/logo.png" alt="logo" />
      {window.location.pathname === '/browse' && (
        <div className='flex flex-col items-center gap-2'>
        <div className='flex items-center gap-4'>
          <img src={photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX5DWWYRWd7uysUpQK690_mjjaBPgll2-V0Q&s"} alt="user" className='w-10 h-10 rounded-full' />
          <button className='bg-red-600 px-4 py-1 rounded-md text-white' onClick={() => handleSignOut()}>Sign Out</button>
          
        </div>
        <p className='text-red-600 gradient-text text-lg'>Hi, {user}</p>
        </div>
      )}
    </div>
  )
}

export default Header
