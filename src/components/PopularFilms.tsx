import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPopuplarMovies, getPopuplarTVShows } from '../utils/api';
import { FilmCard } from './FilmCard';

export function PopularFilms() {
	const [typeFilm, setTypeFilm] = useState<'movies' | 'tv'>('movies');

	const {
		data: popularMovies,
		isLoading: isLoadingMovies,
		isError: isErrorMovies,
	} = useQuery(['popularMovies'], getPopuplarMovies);

	const {
		data: popularTVShows,
		isLoading: isLoadingTV,
		isError: isErrorTV,
	} = useQuery(['popularTVShows'], getPopuplarTVShows);

	return (
		<section className='px-8 mx-auto '>
			<h2 className='mb-2 text-4xl font-semibold text-primary'>Most Popular</h2>
			<div className='flex gap-2 mb-4 text-white'>
				<button
					onClick={() => setTypeFilm('movies')}
					disabled={typeFilm === 'movies'}
					className={`${
						typeFilm === 'movies' ? 'opacity-100 bg-primary' : ''
					} px-2 transition py-1  hover:opacity-100 hover:bg-primary min-w-[3rem] rounded text-sm`}
				>
					Movies
				</button>
				<button
					onClick={() => setTypeFilm('tv')}
					disabled={typeFilm === 'tv'}
					className={`${
						typeFilm === 'tv' ? 'opacity-100 bg-primary' : ''
					} px-2 transition py-1  hover:opacity-100 hover:bg-primary min-w-[3rem] rounded text-sm`}
				>
					TV Shows
				</button>
			</div>
			<div className='grid grid-cols-[repeat(auto-fit,minmax(220px,_1fr))] gap-4 text-center text-white pb-12 '>
				{typeFilm === 'movies' ? (
					isLoadingMovies ? (
						<div>Loading...</div>
					) : isErrorMovies ? (
						<div>Error</div>
					) : (
						popularMovies?.map((popularMovie) => {
							return <FilmCard key={popularMovie.id} film={popularMovie} />;
						})
					)
				) : typeFilm === 'tv' ? (
					isLoadingTV ? (
						<div>Loading...</div>
					) : isErrorTV ? (
						<div>Error</div>
					) : (
						popularTVShows?.map((popularTVShow) => {
							return <FilmCard key={popularTVShow.id} film={popularTVShow} />;
						})
					)
				) : null}
			</div>
		</section>
	);
}
