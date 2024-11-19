import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacterById = createAsyncThunk(
  "characterDetails/fetchCharacterById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch character details.");
    }
  }
);

const characterDetailsSlice = createSlice({
  name: "characterDetails",
  initialState: {
    character: null,
    status: "idle",
    error: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterById.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.character = action.payload;
      })
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.state.error = action.payload || "An error occurred.";
      });
  }
});

export default characterDetailsSlice.reducer;
