const API_KEY = 'ff5599f8c9813ec871c8879a4b2137b1';

export interface Movie {
	id: number;
	title: string;
	backdrop_path: string;
	adult: boolean;
	overview: string;
	vote_average: number;
	release_date: string;
	genre_ids: number[];
	poster_path: string;
}

export interface TVShow {
	id: number;
	name: string;
	backdrop_path: string;
	overview: string;
	vote_average: number;
	first_air_date: string;
	genre_ids: number[];
	poster_path: string;
}

export async function getPopuplarMovies(): Promise<Movie[]> {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
		);

		if (!response.ok) {
			throw new Error('The request did not complete correctly.');
		}

		const data = await response.json();

		return data.results;
	} catch (error) {
		console.log(error);
		throw new Error('Error fetching trending movies.');
	}
}

export async function getPopuplarTVShows(): Promise<TVShow[]> {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
		);

		if (!response.ok) {
			throw new Error('The request did not complete correctly.');
		}

		const data = await response.json();

		return data.results;
	} catch (error) {
		console.log(error);
		throw new Error('Error fetching trending movies.');
	}
}

export async function getFilmsByKeyword(
	keyword: string
): Promise<Movie[] | TVShow[]> {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${keyword}`
		);

		if (!response.ok) {
			throw new Error('The request did not complete correctly.');
		}

		const data = await response.json();

		return data.results;
	} catch (error) {
		console.log(error);
		throw new Error('Error fetching trending movies.');
	}
}
