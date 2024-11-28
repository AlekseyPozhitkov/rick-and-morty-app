import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import { axiosInstance } from "../../../axiosInstance";
import { RootState } from "../store";

interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  status: string;
}

export interface Filters {
  name?: string;
  species?: string;
  gender?: string;
  status?: string;
}

interface FetchCharactersParams {
  page: number;
  filters: Filters;
}

interface FetchCharactersResponse {
  info: {
    next: string | null;
  };
  results: Character[];
}

export interface CharactersState {
  items: Character[];
  status: "idle" | "loading" | "succeeded" | "failed";
  nextPage: number;
  hasMore: boolean;
  filters: Filters;
  filterOptions: {
    species: string[];
    gender: string[];
    status: string[];
  };
  error: string | null;
}

const initialState: CharactersState = {
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
  error: null
};

export const fetchCharacters = createAsyncThunk<
  FetchCharactersResponse,
  FetchCharactersParams,
  { rejectValue: string }
>("characters/fetchCharacters", async ({ page, filters }, { rejectWithValue }) => {
  try {
    const { name, status, species, gender } = filters;
    const response = await axiosInstance.get<FetchCharactersResponse>("/character", {
      params: { page, name, status, species, gender }
    });

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch characters.");
    }

    return rejectWithValue("An unknown error occurred.");
  }
});

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacterFilter: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.items = [];
      state.nextPage = 1;
      state.hasMore = true;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        // Добавляем только уникальных персонажей
        const existingIds = new Set(state.items.map((item) => item.id));
        const uniqueCharacters = action.payload.results.filter(
          (character) => !existingIds.has(character.id)
        );

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
        state.error = action.payload || "An error occurred.";
      });
  }
});

export const selectCharacterById = (state: RootState, itemId: number): Character | null =>
  state.characters.items.find((item) => item.id === itemId) || null;

export const { setCharacterFilter } = charactersSlice.actions;
export default charactersSlice.reducer;
