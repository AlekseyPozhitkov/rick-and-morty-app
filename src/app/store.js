import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../features/characters/charactersSlice';
import episodesReducer from '../features/episodes/episodesSlice';
import locationsReducer from '../features/locations/locationsSlice';

export const store = configureStore({
    reducer: {
        characters: charactersReducer,
        episodes: episodesReducer,
        locations: locationsReducer,
    },
});

export default store;