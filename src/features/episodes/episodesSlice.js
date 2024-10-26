import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "https://rickandmortyapi.com/api/episode";

export const fetchEpisodes = createAsyncThunk('episodes/fetchEpisodes', async () => {
    const response = await axios.get(baseUrl);
    return response.data.results;
});

const episodesSlice = createSlice({
    name: 'episodes',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEpisodes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEpisodes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchEpisodes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default episodesSlice.reducer;
