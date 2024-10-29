import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './slices/charactersSlice';
import episodesReducer from './slices/episodesSlice';
import locationsReducer from './slices/locationsSlice';

export const store = configureStore({
    reducer: {
        characters: charactersReducer,
        episodes: episodesReducer,
        locations: locationsReducer,
    },
});

export default store;