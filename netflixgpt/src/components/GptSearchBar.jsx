import lang from '@/utils/languageConstants'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { openai } from '@/utils/openai';
import toast from 'react-hot-toast';
import axios from 'axios';
import { options } from '@/utils/Network Manager';
import { BASE_URL } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { addMovieNames, addSearchMovies } from '@/redux/gptSlice';
import GptMovieSuggestions from './GptMovieSuggestions';

function GptSearchBar() {
  const language = useSelector((store) => store.config.language);
  const movieNames = useSelector((store) => store.gpt.movieNames);
  const searchMovies = useSelector((store) => store.gpt.searchMovies);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  // handle search the movie from TMDB
  const handleMovieSearch = async (movieName) => {
    const response = await axios.get(`${BASE_URL.GET_NOW_PLAYING_MOVIES}/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`, options);
    dispatch(addSearchMovies(response.data.results));
    dispatch(addMovieNames(response.data.results.map((movie) => movie.title)));
    console.log(response.data.results);
  }
  const handleGptSearchMovie = async () => {
    console.log(inputRef.current.value);  // get the value of the input field

    const gptQuery = `Act as a movie recommendation system. I will provide you with a movie name, and you will provide me with a list of similar movies. Only give 5 movies, no more no less, comma separated like example: "Movie 1, Movie 2, Movie 3, Movie 4, Movie 5".
    Movie name: ${inputRef.current.value}`; // this is the query for the gpt api

    // call the gpt api
    const gptResponse = await openai.chat.completions.create({
      model: import.meta.env['VITE_GPT_MODEL'],
      messages: [{ role: "user", content: gptQuery }],
    });

    if (!gptResponse.choices[0].message.content) {
      return toast.error("No movies found");
    }
    else {
      const gptMovies = gptResponse.choices[0].message.content.split(", "); // [Ayan, Sarkar, Indian2, KGF, Pushpa]
      const promiseArray = gptMovies.map((movie) => handleMovieSearch(movie));
      // [Promise, Promise, Promise, Promise, Promise] - 5 promises
      const response = await Promise.all(promiseArray);
      console.log(response);
      toast.success("Movies fetched successfully");
    }
  }
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input ref={inputRef} type="text" className='w-full p-4 my-4 bg-transparent border-2 border-gray-700 rounded-lg text-white absolute top-20 ' placeholder={lang[language].gptSearchPlaceholder} />
        <button className='p-2 my-2 bg-red-700 text-white rounded-lg px-6 absolute top-24 right-2' onClick={handleGptSearchMovie}>{lang[language].gptSearchButton}</button>
        {/* Movie Cards */}
        <div className='absolute top-48 right-auto overflow-x-scroll scrollbar-hide'>
            <GptMovieSuggestions movies={searchMovies || []} />
        </div>
      </form>
    </div>
  )
}

export default GptSearchBar
