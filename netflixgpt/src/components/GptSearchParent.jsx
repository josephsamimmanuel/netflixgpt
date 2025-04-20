import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { IMAGE_URL } from '@/utils/constant'

function GptSearchParent() {
  return (
    <div className='pt-20 px-6'>
      <img src={IMAGE_URL.HEADER_LOGO} alt="Netflix GPT" className='w-full h-full object-cover opacity-20' />
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearchParent
