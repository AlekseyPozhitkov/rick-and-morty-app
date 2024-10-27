import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "https://rickandmortyapi.com/api/episode";

export const fetchEpisodes = createAsyncThunk(
    'episodes/fetchEpisodes',
    async (page) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await axios.get(`${baseUrl}?page=${page}`);
        return response.data;
    }
);

const episodesSlice = createSlice({
    name: 'episodes',
    initialState: {
        items: [],
        status: 'idle',
        nextPage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEpisodes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEpisodes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = [...state.items, ...action.payload.results]; // добавляем новые данные
                state.nextPage = action.payload.info.next; // сохраняем информацию о следующей странице
            })
            .addCase(fetchEpisodes.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default episodesSlice.reducer;
