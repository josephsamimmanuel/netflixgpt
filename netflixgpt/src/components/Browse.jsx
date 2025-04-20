import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useNowPlayingMovies from '@/hooks/useNowPlayingMovies';
import usePopularMovies from '@/hooks/usePopularMovies';
import useTopRatedMovies from '@/hooks/useTopRatedMovies';
import useUpcomingMovies from '@/hooks/useUpcomingMovies';
import GptSearch from './GptSearchParent';
import { useSelector } from 'react-redux';

const Browse = () => {
    const gptSearch = useSelector((store) => store.gpt.gptSearch);
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    return (
        <div className='bg-gradient-to-b from-gray-900 to-black overflow-hidden'>
            <Header/>
            {gptSearch && <GptSearch/>}
            {!gptSearch && (
                <>
                    <MainContainer/>
                    <SecondaryContainer/>
                </>
            )}
        </div>
    );
};

export default Browse; 