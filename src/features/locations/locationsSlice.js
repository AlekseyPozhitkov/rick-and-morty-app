// src/features/locations/locationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLocations = createAsyncThunk(
    'locations/fetchLocations',
    async (page) => {
        const response = await axios.get(`https://rickandmortyapi.com/api/location?page=${page}`);
        return response.data;
    }
);

const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        items: [],
        status: 'idle',
        nextPage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = [...state.items, ...action.payload.results]; // добавляем новые данные к существующим
                state.nextPage = action.payload.info.next; // обновляем nextPage
            })
            .addCase(fetchLocations.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default locationsSlice.reducer;
