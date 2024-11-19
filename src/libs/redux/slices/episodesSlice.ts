import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEpisodes = createAsyncThunk(
  "episodes/fetchEpisodes",
  async ({ page, filters }, { rejectWithValue }) => {
    try {
      const { name } = filters;
      const response = await axios.get("https://rickandmortyapi.com/api/episode", {
        params: { page, name }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch characters.");
    }
  }
);

const episodesSlice = createSlice({
  name: "episodes",
  initialState: {
    items: [],
    status: "idle",
    nextPage: 1,
    hasMore: true,
    filters: { name: "" },
    errorMessage: "" // Добавляем поле для хранения сообщения об ошибке
  },
  reducers: {
    setEpisodeFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.items = [];
      state.nextPage = 1;
      state.hasMore = true;
      state.errorMessage = ""; // Очищаем сообщение об ошибке при изменении фильтра
    },
    resetEpisodes: (state) => {
      // Сбрасываем состояние к исходному
      state.items = [];
      state.status = "idle";
      state.nextPage = 1;
      state.hasMore = true;
      state.filters = { name: "" };
      state.errorMessage = "";
    }
  },
  // Добавляем обработку fetchCharacterEpisodes в extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = "loading";
        state.errorMessage = ""; // Очищаем сообщение об ошибке при новой попытке загрузки
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.errorMessage = "";

        // Используем Set для отслеживания уникальных id
        const existingIds = new Set(state.items.map((item) => item.id));

        // Добавляем только уникальные эпизоды
        const uniqueEpisodes = action.payload.results.filter(
          (episode) => !existingIds.has(episode.id)
        );

        state.items = [...state.items, ...uniqueEpisodes];
        state.nextPage += 1;
        state.hasMore = !!action.payload.info.next;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.status = "failed";
        state.hasMore = false;
        state.errorMessage = action.payload || "An error occurred."; // Сохраняем сообщение об ошибке
      });
  }
});

// Селектор
export const selectEpisodeById = (state, itemId) =>
  state.episodes.items.find((item) => item.id === itemId) || null;

export const { setEpisodeFilter, resetEpisodes } = episodesSlice.actions;
export default episodesSlice.reducer;
