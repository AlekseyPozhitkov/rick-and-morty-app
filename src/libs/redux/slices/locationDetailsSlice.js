import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLocationById = createAsyncThunk("locationDetails/fetchlocationById", async (id) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
  return response.data;
});

const locationDetailsSlice = createSlice({
  name: "locationDetails",
  initialState: {
    location: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLocationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.location = action.payload;
      })
      .addCase(fetchLocationById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default locationDetailsSlice.reducer;
