import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async ({ page, filters }) => {
        const { name, status, species, gender } = filters;
        const response = await axios.get('https://rickandmortyapi.com/api/character', {
            params: { page, name, status, species, gender },
        });
        return response.data;
    }
);

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        items: [],
        status: 'idle',
        nextPage: 1,
        hasMore: true,
        filters: {
            name: '',
            status: '',
            species: '',
            gender: '',
        },
        filterOptions: {
            species: [],
            gender: [],
            status: [],
        },
    },
    reducers: {
        setFilter: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.items = [];
            state.nextPage = 1;
            state.hasMore = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = [...state.items, ...action.payload.results];
                state.nextPage += 1;
                state.hasMore = !!action.payload.info.next;

                // Обновляем filterOptions с уникальными значениями
                action.payload.results.forEach((character) => {
                    if (!state.filterOptions.species.includes(character.species)) {
                        state.filterOptions.species.push(character.species);
                    }
                    if (!state.filterOptions.gender.includes(character.gender)) {
                        state.filterOptions.gender.push(character.gender);
                    }
                    if (!state.filterOptions.status.includes(character.status)) {
                        state.filterOptions.status.push(character.status);
                    }
                });
                Object.keys(state.filterOptions).forEach((filterType) => {
                    state.filterOptions[filterType] = state.filterOptions[filterType].sort((a, b) => {
                        if (a === "unknown") return 1;
                        if (b === "unknown") return -1;
                        return a.localeCompare(b);
                    });
                });
            })
            .addCase(fetchCharacters.rejected, (state) => {
                state.status = 'failed';
                state.hasMore = false;
            });
    }
});

export const { setFilter } = charactersSlice.actions;
export default charactersSlice.reducer;
