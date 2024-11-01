import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacterById = createAsyncThunk("characterDetails/fetchCharacterById", async (id) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
  return response.data;
});

const characterDetailsSlice = createSlice({
  name: "characterDetails",
  initialState: {
    character: null,
    status: "idle",
    error: null,
  },
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
        state.error = action.error.message;
      });
  },
});

export default characterDetailsSlice.reducer;
