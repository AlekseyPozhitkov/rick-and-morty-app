import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async ({ page, filters }) => {
        const { name, status, species, gender } = filters;

        // await new Promise(resolve => setTimeout(resolve, 1000));  // Задержка для имитации загрузки

        const response = await axios.get('https://rickandmortyapi.com/api/character', {
            params: { page, name, status, species, gender },
        });

        return response.data;
    }
);

// Функция сортировки опций, перемещающая "unknown" в конец
const sortOptions = (options) => {
    return options
        .filter(option => option !== 'unknown')
        .concat(options.includes('unknown') ? ['unknown'] : []);
};

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        items: [],
        status: 'idle',
        nextPage: 1,
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

                // Обновляем filterOptions с уникальными значениями и сортируем "unknown" в конец
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

                // Применение сортировки
                state.filterOptions.species = sortOptions(state.filterOptions.species);
                state.filterOptions.gender = sortOptions(state.filterOptions.gender);
                state.filterOptions.status = sortOptions(state.filterOptions.status);
            })
            .addCase(fetchCharacters.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { setFilter } = charactersSlice.actions;
export default charactersSlice.reducer;
