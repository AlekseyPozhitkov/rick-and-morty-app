import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLocationById = createAsyncThunk(
  "locationDetails/fetchlocationById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch locations.");
    }
  }
);

const locationDetailsSlice = createSlice({
  name: "locationDetails",
  initialState: {
    location: null,
    status: "idle",
    error: ""
  },
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
