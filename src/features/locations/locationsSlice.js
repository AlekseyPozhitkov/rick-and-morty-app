// src/features/locations/locationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLocations = createAsyncThunk(
    'locations/fetchLocations',
    async ({ page, filters }) => {
        const { name, type, dimension } = filters || {};

        // await new Promise((resolve) => setTimeout(resolve, 1000)); // Задержка для имитации загрузки

        const response = await axios.get('https://rickandmortyapi.com/api/location', {
            params: { page, name, type, dimension },
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

const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        items: [],
        status: 'idle',
        nextPage: 1,
        filters: {
            name: '',
            type: '',
            dimension: '',
        },
        filterOptions: {
            type: [],
            dimension: [],
        },
    },
    reducers: {
        setLocationFilter: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.items = [];
            state.nextPage = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = [...state.items, ...action.payload.results];
                state.nextPage += 1;

                // Обновляем filterOptions с уникальными значениями и сортируем "unknown" в конец
                action.payload.results.forEach((location) => {
                    if (!state.filterOptions.type.includes(location.type)) {
                        state.filterOptions.type.push(location.type);
                    }
                    if (!state.filterOptions.dimension.includes(location.dimension)) {
                        state.filterOptions.dimension.push(location.dimension);
                    }
                });

                // Применение сортировки
                state.filterOptions.type = sortOptions(state.filterOptions.type);
                state.filterOptions.dimension = sortOptions(state.filterOptions.dimension);
            })
            .addCase(fetchLocations.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { setLocationFilter } = locationsSlice.actions;
export default locationsSlice.reducer;
