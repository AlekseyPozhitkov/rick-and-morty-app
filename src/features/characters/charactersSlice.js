import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async (page) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        return response.data;
    }
);

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        items: [],
        status: 'idle',
        nextPage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = [...state.items, ...action.payload.results]; // добавляем новые данные к существующим
                state.nextPage = action.payload.info.next; // обновляем nextPage
            })
            .addCase(fetchCharacters.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export default charactersSlice.reducer;
