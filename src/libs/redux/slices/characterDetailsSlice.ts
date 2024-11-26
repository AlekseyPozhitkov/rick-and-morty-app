import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import { axiosInstance } from "../../../axiosInstance";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface Character {
  id: number;
  name: string;
  species: string;
  type: string;
  gender: string;
  status: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
}

interface CharacterState {
  character: Character | null;
  episodes: Episode[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CharacterState = {
  character: null,
  episodes: [],
  status: "idle",
  error: null
};

export const fetchCharacterById = createAsyncThunk<
  { character: Character; episodes: Episode[] },
  number,
  { rejectValue: string }
>("characterDetails/fetchCharacterById", async (id, { rejectWithValue }) => {
  try {
    const characterResponse = await axiosInstance.get<Character>(`/character/${id}`);
    const character = characterResponse.data;

    const episodeIds = character.episode.map((url) => url.split("/").pop()).join(",");
    const episodesResponse = await axiosInstance.get<Episode[] | Episode>(`/episode/${episodeIds}`);

    const episodes = Array.isArray(episodesResponse.data)
      ? episodesResponse.data
      : [episodesResponse.data];

    return { character, episodes };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch character details.");
    }

    return rejectWithValue("An unknown error occurred.");
  }
});

const characterDetailsSlice = createSlice({
  name: "characterDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.episodes = [];
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.character = action.payload.character;
        state.episodes = action.payload.episodes;
      })
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An error occurred.";
      });
  }
});

export default characterDetailsSlice.reducer;
