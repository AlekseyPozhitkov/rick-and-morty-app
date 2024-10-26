// src/features/locations/locationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "https://rickandmortyapi.com/api/location";

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async () => {
    const response = await axios.get(baseUrl);
    return response.data.results;
});

const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default locationsSlice.reducer;
