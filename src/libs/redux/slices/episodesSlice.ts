import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import { axiosInstance } from "../../../axiosInstance";
import { RootState } from "../store";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface Filters {
  name: string;
}

interface FetchEpisodesParams {
  page: number;
  filters: Filters;
}

interface FetchEpisodesResponse {
  info: {
    next: string | null;
  };
  results: Episode[];
}

export interface EpisodesState {
  items: Episode[];
  status: "idle" | "loading" | "succeeded" | "failed";
  nextPage: number;
  hasMore: boolean;
  filters: Filters;
  error: string | null;
}

const initialState: EpisodesState = {
  items: [],
  status: "idle",
  nextPage: 1,
  hasMore: true,
  filters: { name: "" },
  error: null
};

export const fetchEpisodes = createAsyncThunk<
  FetchEpisodesResponse,
  FetchEpisodesParams,
  { rejectValue: string }
>("episodes/fetchEpisodes", async ({ page, filters }, { rejectWithValue }) => {
  try {
    const { name } = filters;
    const response = await axiosInstance.get<FetchEpisodesResponse>("/episode", {
      params: { page, name }
    });

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch episodes.");
    }

    return rejectWithValue("An unknown error occurred.");
  }
});

const episodesSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    setEpisodeFilter: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.items = [];
      state.nextPage = 1;
      state.hasMore = true;
      state.error = null;
    },
    resetEpisodes: (state) => {
      state.items = [];
      state.status = "idle";
      state.nextPage = 1;
      state.hasMore = true;
      state.filters = { name: "" };
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        // Добавляем только уникальные эпизоды
        const existingIds = new Set(state.items.map((item) => item.id));
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
        state.error = action.payload || "An error occurred.";
      });
  }
});

export const selectEpisodeById = (state: RootState, itemId: number): Episode | null =>
  state.episodes.items.find((item) => item.id === itemId) || null;

export const { setEpisodeFilter, resetEpisodes } = episodesSlice.actions;
export default episodesSlice.reducer;
