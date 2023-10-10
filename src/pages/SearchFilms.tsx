import { useLocation } from 'react-router-dom';
import { getFilmsByKeyword } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { FilmCard } from '../components/FilmCard';

export function SearchFilms() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const keyword: string = searchParams.get('keyword') || '';

	const {
		data: searchFilms,
		isLoading,
		isError,
	} = useQuery(['searchFilms', keyword], () => getFilmsByKeyword(keyword));

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error</div>;
	}

	return (
		<main className='flex-1 bg-gray'>
			<section className='px-8 mt-20'>
				<div className='mb-4 w-fit'>
					<h1 className='text-4xl font-bold text-primary w-fit'>{keyword}</h1>
					<hr className='bg-white border-white opacity-40' />
				</div>
				<div className=' min-h-[10rem]  text-white relative '>
					{searchFilms.length === 0 ? (
						<span className='absolute -translate-x-1/2 -translate-y-1/2 opacity-60 top-1/2 left-1/2 '>
							You don't have any favorite movies yet.
						</span>
					) : (
						<div className='grid grid-cols-[repeat(auto-fit,minmax(220px,_1fr))] gap-4 text-center text-white pb-12 '>
							{searchFilms.map((favorite) => {
								return <FilmCard key={favorite.id} film={favorite} />;
							})}
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
