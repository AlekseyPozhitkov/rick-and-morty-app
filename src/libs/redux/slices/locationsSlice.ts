import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import { RootState } from "../store";
import { axiosInstance } from "./axiosInstance";

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

interface Filters {
  name: string;
  type: string;
  dimension: string;
}

interface FetchLocationsParams {
  page: number;
  filters: Filters;
}

interface FetchLocationsResponse {
  info: {
    next: string | null;
  };
  results: Location[];
}

interface LocationsState {
  items: Location[];
  status: "idle" | "loading" | "succeeded" | "failed";
  nextPage: number;
  hasMore: boolean;
  filters: Filters;
  filterOptions: {
    type: string[];
    dimension: string[];
  };
  error: string | null;
}

const initialState: LocationsState = {
  items: [],
  status: "idle",
  nextPage: 1,
  hasMore: true,
  filters: {
    name: "",
    type: "",
    dimension: ""
  },
  filterOptions: {
    type: [],
    dimension: []
  },
  error: null
};

export const fetchLocations = createAsyncThunk<
  FetchLocationsResponse,
  FetchLocationsParams,
  { rejectValue: string }
>("locations/fetchLocations", async ({ page, filters }, { rejectWithValue }) => {
  try {
    const { name, type, dimension } = filters || {};
    const response = await axiosInstance.get<FetchLocationsResponse>("/location", {
      params: { page, name, type, dimension }
    });

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch locations.");
    }

    return rejectWithValue("An unknown error occurred.");
  }
});

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocationFilter: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.items = [];
      state.nextPage = 1;
      state.hasMore = true;
      state.error = null;
    },
    resetLocations: (state) => {
      state.items = [];
      state.status = "idle";
      state.nextPage = 1;
      state.hasMore = true;
      state.filters = { name: "", type: "", dimension: "" };
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        // Добавляем только уникальные локации
        const existingIds = new Set(state.items.map((item) => item.id));
        const uniqueLocations = action.payload.results.filter(
          (location) => !existingIds.has(location.id)
        );

        state.items = [...state.items, ...uniqueLocations];
        state.nextPage += 1;
        state.hasMore = !!action.payload.info.next;

        // Обновляем опции фильтра только для уникальных значений
        action.payload.results.forEach((location) => {
          if (location.type && !state.filterOptions.type.includes(location.type)) {
            state.filterOptions.type.push(location.type);
          }
          if (location.dimension && !state.filterOptions.dimension.includes(location.dimension)) {
            state.filterOptions.dimension.push(location.dimension);
          }
        });
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = "failed";
        state.hasMore = false;
        state.error = action.payload || "An error occurred.";
      });
  }
});

export const selectLocationById = (state: RootState, itemId: number): Location | null =>
  state.locations.items.find((item) => item.id === itemId) || null;

export const { setLocationFilter, resetLocations } = locationsSlice.actions;
export default locationsSlice.reducer;
