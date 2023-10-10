import { getPopuplarMovies } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { convertGenres } from '../utils/convertGenres';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addFavorite, removeFavorite } from '../redux/reducers/favoritesSlice';

export function Hero() {
	const {
		data: popularMovies,
		isLoading,
		isError,
	} = useQuery(['popularMovies'], getPopuplarMovies);

	const favorites = useAppSelector((state) => state.favorites);
	const dispatch = useAppDispatch();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error</div>;
	}

	const heroMovie = popularMovies[0];

	const heroMovieGenres = convertGenres(heroMovie.genre_ids);

	return (
		<>
			<section className='relative'>
				<img
					className='w-full min-h-[25rem] max-h-[38rem] object-cover '
					src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
					alt='Hero'
				/>
				<div className='absolute bottom-0 w-full text-center text-white bg-gradient-to-t from-40% from-gray via-70% to-transparent via-grayTransparent '>
					<div className='flex flex-col max-w-4xl gap-3 px-8 py-8 mx-auto'>
						<span className='text-4xl font-semibold'>{heroMovie.title} </span>
						<div className='flex items-center justify-center gap-2 text-xs opacity-60'>
							<span className='px-1 border rounded '>
								{heroMovie.adult === false ? 'AP' : '+18'}
							</span>{' '}
							<span>{heroMovie.release_date.slice(0, 4)}</span>
							<div className='flex items-center gap-1'>
								<i className='fa-regular fa-star'></i>
								<span>{heroMovie.vote_average}</span>
							</div>
							<div className='flex items-center gap-1'>
								{heroMovieGenres.map((genre) => {
									return <span key={genre}>{genre}</span>;
								})}
							</div>
						</div>
						<span className='text-sm opacity-60 '>
							{heroMovie.overview.length > 180
								? `${heroMovie.overview.slice(0, 180)}...`
								: heroMovie.overview}
						</span>

						<div className='flex justify-center gap-4 text-sm '>
							{' '}
							<button className='px-6 py-2 border rounded-full border-primary bg-primary hover:bg-transparent'>
								More Info <i className='ml-2 fa-solid fa-info'></i>
							</button>
							<button
								onClick={() => {
									favorites.find((favorite) => favorite.id === heroMovie.id)
										? dispatch(removeFavorite(heroMovie))
										: dispatch(addFavorite(heroMovie));
								}}
								className='px-6 py-2 bg-transparent border rounded-full border-primary hover:bg-primary'
							>
								{' '}
								{favorites.find((favorite) => favorite.id === heroMovie.id) ? (
									<>
										Remove from favorites{' '}
										<i className='ml-2 fa-solid fa-heart'></i>
									</>
								) : (
									<>
										Add to favorites{' '}
										<i className='ml-2 fa-regular fa-heart'></i>
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
