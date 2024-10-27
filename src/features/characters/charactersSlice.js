import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async ({ page, filter }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}&name=${filter}`);
        return response.data;
    }
);

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        items: [],
        status: 'idle',
        nextPage: 1,
        filter: '',
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.items = []; // очищаем items при изменении фильтра
            state.nextPage = 1; // сбрасываем страницу
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
                state.nextPage = state.nextPage + 1;
            })
            .addCase(fetchCharacters.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { setFilter } = charactersSlice.actions;
export default charactersSlice.reducer;
