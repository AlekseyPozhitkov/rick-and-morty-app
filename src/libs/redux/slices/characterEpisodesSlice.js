import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронный экшн для загрузки эпизодов персонажа
export const fetchCharacterEpisodes = createAsyncThunk(
  "characterEpisodes/fetchCharacterEpisodes",
  async (episodeUrls, { rejectWithValue }) => {
    try {
      const episodeIds = episodeUrls.map((url) => url.split("/").pop()).join(",");
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch character episodes.");
    }
  }
);

const characterEpisodesSlice = createSlice({
  name: "characterEpisodes",
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterEpisodes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCharacterEpisodes.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Преобразуем данные в массив, если это объект
        const episodes = Array.isArray(action.payload) ? action.payload : [action.payload];
        state.items = episodes;
      })
      .addCase(fetchCharacterEpisodes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch character episodes.";
      });
  }
});

export default characterEpisodesSlice.reducer;
