import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEpisodes = createAsyncThunk("episodes/fetchEpisodes", async ({ page, filters }) => {
  const { name } = filters;

  const response = await axios.get("https://rickandmortyapi.com/api/episode", {
    params: { page, name },
  });
  return response.data;
});

const episodesSlice = createSlice({
  name: "episodes",
  initialState: {
    items: [],
    status: "idle",
    nextPage: 1,
    hasMore: true, // Добавляем hasMore для отслеживания наличия данных
    filters: {
      name: "",
    },
  },
  reducers: {
    setEpisodeFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.items = [];
      state.nextPage = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Используем Set для отслеживания уникальных id
        const existingIds = new Set(state.items.map((item) => item.id));

        // Добавляем только уникальные эпизоды
        const uniqueEpisodes = action.payload.results.filter((episode) => !existingIds.has(episode.id));
        state.items = [...state.items, ...uniqueEpisodes];

        state.nextPage += 1;
        state.hasMore = !!action.payload.info.next;
      })
      .addCase(fetchEpisodes.rejected, (state) => {
        state.status = "failed";
        state.hasMore = false;
      });
  },
});

export const { setEpisodeFilter } = episodesSlice.actions;
export default episodesSlice.reducer;
