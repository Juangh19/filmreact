import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, TVShow } from '../../utils/api';

const initialState: (Movie | TVShow)[] = [];

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorite: (state, action: PayloadAction<Movie | TVShow>) => {
			state.push(action.payload);
		},
		removeFavorite: (state, action) => {
			return state.filter((favorite) => favorite.id !== action.payload.id);
		},
	},
});

export default favoritesSlice.reducer;
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
