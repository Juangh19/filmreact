import { Hero } from '../components/Hero';
import { PopularFilms } from '../components/PopularFilms';

export function Home() {
	return (
		<main className='flex-1 bg-gray'>
			<Hero />
			<PopularFilms />
		</main>
	);
}
