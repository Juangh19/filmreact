import { useEffect, useState } from 'react';
import { Movie, TVShow } from '../utils/api';
import { useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/reducers/favoritesSlice';
import { useAppSelector } from '../redux/store';

export function FilmCard({ film }: { film: Movie | TVShow }) {
	const [isHovered, setIsHovered] = useState(false);
	const [favoriteHovered, setFavoriteHovered] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const dispatch = useDispatch();

	const favorites = useAppSelector((state) => state.favorites);

	useEffect(() => {
		if (favorites.find((favorite) => favorite.id === film.id)) {
			setIsFavorite(true);
		} else {
			setIsFavorite(false);
		}
	}, [favorites, film.id]);

	let releaseDate;
	let title;

	if ('title' in film) {
		title = film.title;
	} else {
		title = film.name;
	}

	if ('release_date' in film) {
		releaseDate = film.release_date.slice(0, 4);
	} else {
		releaseDate = film.first_air_date.slice(0, 4);
	}

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className='bg-[#242832] rounded-2xl cursor-pointer  max-w-[300px]  border-[1px] transition duration-300  border-transparent hover:border-primary relative p-2'
		>
			<div className='relative'>
				<div
					className={`absolute w-full h-full duration-300  ${
						isHovered ? 'hover:opacity-100' : 'opacity-0'
					} rounded-xl bg-gradient-to-t from-primary to-transparent`}
				>
					<i
						onMouseEnter={() => setFavoriteHovered(true)}
						onMouseLeave={() => setFavoriteHovered(false)}
						onClick={() => {
							isFavorite
								? dispatch(removeFavorite(film))
								: dispatch(addFavorite(film));
						}}
						className={`absolute text-2xl cursor-pointer top-1 right-2 transition-[scale] ${
							isFavorite ? 'fa-solid ' : 'fa-regular '
						}  ${favoriteHovered ? 'scale-95 opacity-70' : ''} fa-heart`}
					></i>
					<div className='absolute flex items-center justify-center w-full text-xl font-semibold -translate-y-1/2 opacity-90 top-1/2'>
						More info
					</div>
				</div>
				<img
					className='w-full rounded-xl '
					src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
				/>
			</div>

			<div className='flex justify-center gap-2 text-xs opacity-60 bg-[#1a1c23] rounded-full mt-2 mb-1'>
				<span>Movie</span>
				<span>{releaseDate}</span>
			</div>
			<span className='text-sm'>{title}</span>
		</div>
	);
}
