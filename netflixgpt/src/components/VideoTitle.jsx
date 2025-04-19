import React from 'react'

function VideoTitle({title, overview}) {
  return (
    <div className='w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black to-transparent flex flex-col gap-8'>
      <p className='text-6xl font-bold'>{title}</p>
      <p className='hidden md:inline-block w-1/3'>{overview}</p>
      <div className='flex gap-4'>
        <button className='bg-white text-black p-2 w-24 rounded-md hover:bg-opacity-80'>Play</button>
        <button className='bg-gray-500 text-white p-2 w-24 rounded-md hover:bg-opacity-80'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
