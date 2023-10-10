import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import { useState } from 'react';

export function NavBar() {
	const navigate = useNavigate();
	const favorites = useAppSelector((state) => state.favorites);
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = () => {
		if (searchTerm) {
			navigate(`filter?keyword=${searchTerm}`);
		}
	};

	// handle search keypress
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<header className='fixed z-10 w-full bg-gradient-to-t from-transparent via-grayTransparent via-60% to-gray text-primary'>
			<section className='flex items-center justify-between gap-8 px-8 py-6 mx-auto'>
				<Link to='/'>
					<h2 className='text-2xl font-bold '>FILMREACT</h2>
				</Link>
				<div className='flex flex-1 max-w-sm px-4 py-1 border rounded-full bg-gray border-primary'>
					<input
						className='flex-1 mr-2 text-sm text-white bg-transparent outline-none '
						type='text'
						placeholder='Rick and Mort...'
						value={searchTerm}
						onChange={(e) => {
							if (e.target.value.length <= 40) {
								setSearchTerm(e.target.value);
							}
						}}
						onKeyUp={handleKeyDown}
					/>
					<i
						onClick={handleSearch}
						className='text-xl cursor-pointer fa-solid fa-magnifying-glass'
					></i>
				</div>
				<Link to='/favorites' className='transition-all hover:scale-110'>
					{favorites.length > 0 ? (
						<div className='relative'>
							<div className='absolute top-0 grid w-4 h-4 text-xs font-semibold text-white rounded-full bg-primary -right-1 rotate-3 place-items-center'>
								{favorites.length}
							</div>
							<i className='text-2xl text-[rgba(250,250,250,0.9)] cursor-pointer  fa-solid fa-heart'></i>
						</div>
					) : (
						<i className='text-2xl cursor-pointer fa-regular fa-heart'></i>
					)}
				</Link>
			</section>
		</header>
	);
}
