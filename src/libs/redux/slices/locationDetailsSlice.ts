import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import { axiosInstance } from "./axiosInstance";

interface LocationDetails {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
}

interface LocationDetailsState {
  location: LocationDetails | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: LocationDetailsState = {
  location: null,
  status: "idle",
  error: null
};

export const fetchLocationById = createAsyncThunk<LocationDetails, number, { rejectValue: string }>(
  "locationDetails/fetchlocationById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<LocationDetails>(`/location/${id}`);

      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || "Failed to fetch locations.");
      }

      return rejectWithValue("An unknown error occurred.");
    }
  }
);

const locationDetailsSlice = createSlice({
  name: "locationDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationById.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchLocationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.location = action.payload;
      })
      .addCase(fetchLocationById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An error occurred.";
      });
  }
});

export default locationDetailsSlice.reducer;
