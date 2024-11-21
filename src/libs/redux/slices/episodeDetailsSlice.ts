import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import { axiosInstance } from "./axiosInstance";

interface EpisodeDetails {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

interface EpisodeState {
  episode: EpisodeDetails | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EpisodeState = {
  episode: null,
  status: "idle",
  error: null
};

export const fetchEpisodeById = createAsyncThunk<EpisodeDetails, number, { rejectValue: string }>(
  "episodeDetails/fetchepisodeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<EpisodeDetails>(`/episode/${id}`);

      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || "Failed to fetch characters.");
      }

      return rejectWithValue("An unknown error occurred.");
    }
  }
);

const episodeDetailsSlice = createSlice({
  name: "episodeDetails",
  initialState,
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
