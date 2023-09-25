import { NavBar } from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { Footer } from './components/Footer';

function App() {
	return (
		<div className='flex min-h-[100svh] flex-col'>
			<NavBar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='*'
					element={
						<h1 className='absolute font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
							Not Found
						</h1>
					}
				/>
				<Route path='/favorites' element={<Favorites />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
