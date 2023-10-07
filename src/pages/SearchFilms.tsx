import { useLocation } from 'react-router-dom';

export function SearchFilms() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const keyword = searchParams.get('keyword');
	return (
		<main className='grid flex-1 place-content-center bg-gray'>
			<div className='grid bg-red-300 place-items-center'>
				<h1 className='text-4xl text-center '>{keyword}</h1>
			</div>
		</main>
	);
}
