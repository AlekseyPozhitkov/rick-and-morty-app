import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import { axiosInstance } from "../../../axiosInstance";

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
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CharacterState = {
  character: null,
  status: "idle",
  error: null
};

export const fetchCharacterById = createAsyncThunk<Character, number, { rejectValue: string }>(
  "characterDetails/fetchCharacterById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Character>(`/character/${id}`);

      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || "Failed to fetch character details.");
      }

      return rejectWithValue("An unknown error occurred.");
    }
  }
);

const characterDetailsSlice = createSlice({
  name: "characterDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.character = action.payload;
      })
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An error occurred.";
      });
  }
});

export default characterDetailsSlice.reducer;
