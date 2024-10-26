import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "https://rickandmortyapi.com/api/character";

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async () => {
    const response = await axios.get(baseUrl);
    return response.data.results;
});

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        items: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default charactersSlice.reducer;
