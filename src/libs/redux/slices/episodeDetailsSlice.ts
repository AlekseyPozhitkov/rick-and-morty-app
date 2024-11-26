import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import { axiosInstance } from "../../../axiosInstance";

interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  status: string;
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

interface EpisodeState {
  episode: Episode | null;
  characters: Character[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EpisodeState = {
  episode: null,
  characters: [],
  status: "idle",
  error: null
};

export const fetchEpisodeById = createAsyncThunk<
  { episode: Episode; characters: Character[] },
  number,
  { rejectValue: string }
>("episodeDetails/fetchepisodeById", async (id, { rejectWithValue }) => {
  try {
    const episodeResponse = await axiosInstance.get<Episode>(`/episode/${id}`);
    const episode = episodeResponse.data;

    const characterIds = episode.characters.map((url) => url.split("/").pop()).join(",");
    const charactersResponse = await axiosInstance.get<Character[] | Character>(
      `/character/${characterIds}`
    );

    const characters = Array.isArray(charactersResponse.data)
      ? charactersResponse.data
      : [charactersResponse.data];

    return { episode, characters };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch characters.");
    }

    return rejectWithValue("An unknown error occurred.");
  }
});

const episodeDetailsSlice = createSlice({
  name: "episodeDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodeById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.characters = [];
      })
      .addCase(fetchEpisodeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.episode = action.payload.episode;
        state.characters = action.payload.characters;
      })
      .addCase(fetchEpisodeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An error occurred.";
      });
  }
});

export default episodeDetailsSlice.reducer;
