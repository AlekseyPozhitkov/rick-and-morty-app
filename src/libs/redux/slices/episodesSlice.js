import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEpisodes = createAsyncThunk("episodes/fetchEpisodes", async ({ page, filters }) => {
  const { name } = filters;
  const response = await axios.get("https://rickandmortyapi.com/api/episode", {
    params: { page, name }
  });
  return response.data;
});

// Асинхронный экшн для загрузки эпизодов персонажа
export const fetchCharacterEpisodes = createAsyncThunk(
  "episodes/fetchCharacterEpisodes",
  async (episodeUrls) => {
    const episodeIds = episodeUrls.map((url) => url.split("/").pop()).join(",");
    const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
    return response.data;
  }
);

const episodesSlice = createSlice({
  name: "episodes",
  initialState: {
    items: [],
    status: "idle",
    nextPage: 1,
    hasMore: true, // Добавляем hasMore для отслеживания наличия данных
    filters: {
      name: ""
    }
  },
  reducers: {
    setEpisodeFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.items = [];
      state.nextPage = 1;
      state.hasMore = true;
    }
  },
  // Добавляем обработку fetchCharacterEpisodes в extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = "succeeded";

        const existingIds = new Set(state.items.map((item) => item.id));
        const uniqueEpisodes = action.payload.results.filter((episode) => !existingIds.has(episode.id));

        state.items = [...state.items, ...uniqueEpisodes];
        state.nextPage += 1;
        state.hasMore = !!action.payload.info.next;
      })
      .addCase(fetchEpisodes.rejected, (state) => {
        state.status = "failed";
        state.hasMore = false;
      })
      .addCase(fetchCharacterEpisodes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacterEpisodes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Сохраняем эпизоды персонажа в items
      })
      .addCase(fetchCharacterEpisodes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { setEpisodeFilter } = episodesSlice.actions;
export default episodesSlice.reducer;
