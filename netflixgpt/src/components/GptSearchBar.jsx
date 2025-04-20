import React from 'react'
import lang from '@/utils/languageConstants'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { openai } from '@/utils/openai';

function GptSearchBar() {
  const language = useSelector((store) => store.config.language);
  const inputRef = useRef(null);
  const handleGptSearch = async () => {
    console.log(inputRef.current.value);  // get the value of the input field

    const gptQuery = `Act as a movie recommendation system. I will provide you with a movie name, and you will provide me with a list of similar movies. Only give 5 movies, no more no less, comma separated like example: "Movie 1, Movie 2, Movie 3, Movie 4, Movie 5".
    Movie name: ${inputRef.current.value}`;

    // call the gpt api
    const gptResponse = await openai.chat.completions.create({
      model: import.meta.env['VITE_GPT_MODEL'],
      messages: [{ role: "user", content: gptQuery }],
    });

    console.log(gptResponse.choices[0].message.content);
  }
  return (
    <div>
      <form className='flex gap-4 ' onSubmit={(e) => e.preventDefault()}>
        <input ref={inputRef} type="text" className='w-full p-4 my-4 bg-transparent border-2 border-gray-700 rounded-lg text-white absolute top-20 ' placeholder={lang[language].gptSearchPlaceholder} />
        <button className='p-2 my-2 bg-red-700 text-white rounded-lg px-6 absolute top-24 right-2' onClick={handleGptSearch}>{lang[language].gptSearchButton}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
