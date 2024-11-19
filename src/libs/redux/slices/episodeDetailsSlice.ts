import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEpisodeById = createAsyncThunk(
  "episodeDetails/fetchepisodeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch characters.");
    }
  }
);

const episodeDetailsSlice = createSlice({
  name: "episodeDetails",
  initialState: {
    episode: null,
    status: "idle",
    error: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodeById.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchEpisodeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.episode = action.payload;
      })
      .addCase(fetchEpisodeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An error occurred.";
      });
  }
});

export default episodeDetailsSlice.reducer;
