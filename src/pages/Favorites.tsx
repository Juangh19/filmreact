import { FilmCard } from '../components/FilmCard';
import { useAppSelector } from '../redux/store';

export function Favorites() {
	const favorites = useAppSelector((state) => state.favorites);

	return (
		<main className='flex-1 bg-gray'>
			<section className='px-8 mt-20'>
				<div className='mb-4 w-fit'>
					<h1 className='text-4xl font-bold text-primary w-fit'>Favorites</h1>
					<hr className='bg-white border-white opacity-40' />
				</div>
				<div className=' min-h-[10rem]  text-white relative '>
					{favorites.length === 0 ? (
						<span className='absolute -translate-x-1/2 -translate-y-1/2 opacity-60 top-1/2 left-1/2 '>
							You don't have any favorite movies yet.
						</span>
					) : (
						<div className='grid grid-cols-[repeat(auto-fit,minmax(220px,_1fr))] gap-4 text-center text-white pb-12 '>
							{favorites.map((favorite) => {
								return <FilmCard key={favorite.id} film={favorite} />;
							})}
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
