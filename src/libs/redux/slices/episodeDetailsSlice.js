import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEpisodeById = createAsyncThunk("episodeDetails/fetchepisodeById", async (id) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
  return response.data;
});

const episodeDetailsSlice = createSlice({
  name: "episodeDetail",
  initialState: {
    episode: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodeById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEpisodeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.episode = action.payload;
      })
      .addCase(fetchEpisodeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default episodeDetailsSlice.reducer;
