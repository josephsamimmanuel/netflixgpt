import React from 'react'
import lang from '@/utils/languageConstants'
import { useSelector } from 'react-redux';

function GptSearchBar() {
  const language = useSelector((store) => store.config.language);
  return (
    <div>
      <form className='flex gap-4 '>
        <input type="text" className='w-full p-4 my-4 bg-transparent border-2 border-gray-700 rounded-lg text-white absolute top-20 ' placeholder={lang[language].gptSearchPlaceholder} />
        <button className='p-2 my-2 bg-red-700 text-white rounded-lg px-6 absolute top-24 right-2'>{lang[language].gptSearchButton}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
