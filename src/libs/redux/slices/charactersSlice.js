import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async ({ page, filters }, { rejectWithValue }) => {
    try {
      const { name, status, species, gender } = filters;
      const response = await axios.get("https://rickandmortyapi.com/api/character", {
        params: { page, name, status, species, gender }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch characters.");
    }
  }
);

// Экшен для загрузки персонажей, относящихся к конкретной локации
export const fetchLocationCharacters = createAsyncThunk(
  "characters/fetchLocationCharacters",
  async (residentUrls) => {
    const characterIds = residentUrls.map((url) => url.split("/").pop()).join(",");
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterIds}`);
    return response.data;
  }
);

// Новый экшен для загрузки персонажей, относящихся к конкретному эпизоду
export const fetchEpisodeCharacters = createAsyncThunk(
  "characters/fetchEpisodeCharacters",
  async (characterUrls) => {
    const characterIds = characterUrls.map((url) => url.split("/").pop()).join(",");
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterIds}`);
    return response.data;
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    items: [],
    status: "idle",
    nextPage: 1,
    hasMore: true,
    filters: {
      name: "",
      status: "",
      species: "",
      gender: ""
    },
    filterOptions: {
      species: [],
      gender: [],
      status: []
    },
    errorMessage: "" // Добавляем поле для хранения сообщения об ошибке
  },
  reducers: {
    setCharacterFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.items = [];
      state.nextPage = 1;
      state.hasMore = true;
      state.errorMessage = ""; // Очищаем сообщение об ошибке при изменении фильтра
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
        state.errorMessage = ""; // Очищаем сообщение об ошибке при новой попытке загрузки
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.errorMessage = "";

        // Используем Set для отслеживания уникальных id
        const existingIds = new Set(state.items.map((item) => item.id));

        // Добавляем только уникальных персонажей
        const uniqueCharacters = action.payload.results.filter((character) => !existingIds.has(character.id));

        state.items = [...state.items, ...uniqueCharacters];
        state.nextPage += 1;
        state.hasMore = !!action.payload.info.next;

        // Обновляем filterOptions с уникальными значениями
        action.payload.results.forEach((character) => {
          if (!state.filterOptions.species.includes(character.species)) {
            state.filterOptions.species.push(character.species);
          }
          if (!state.filterOptions.gender.includes(character.gender)) {
            state.filterOptions.gender.push(character.gender);
          }
          if (!state.filterOptions.status.includes(character.status)) {
            state.filterOptions.status.push(character.status);
          }
        });
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.hasMore = false;
        state.errorMessage = action.payload || "An error occurred."; // Сохраняем сообщение об ошибке
      })
      .addCase(fetchLocationCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocationCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(fetchLocationCharacters.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchEpisodeCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEpisodeCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(fetchEpisodeCharacters.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export const { setCharacterFilter } = charactersSlice.actions;
export default charactersSlice.reducer;
