import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import { axiosInstance } from "../../../axiosInstance";

interface Resident {
  id: number;
  name: string;
  species: string;
  gender: string;
  status: string;
}

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
}

interface LocationState {
  location: Location | null;
  residents: Resident[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: LocationState = {
  location: null,
  residents: [],
  status: "idle",
  error: null
};

export const fetchLocationById = createAsyncThunk<
  { location: Location; residents: Resident[] },
  number,
  { rejectValue: string }
>("locationDetails/fetchlocationById", async (id, { rejectWithValue }) => {
  try {
    const locationResponse = await axiosInstance.get<Location>(`/location/${id}`);
    const location = locationResponse.data;

    const residentIds = location.residents.map((url) => url.split("/").pop()).join(",");
    const residentsResponse = await axiosInstance.get<Resident[] | Resident>(
      `/character/${residentIds}`
    );

    const residents = Array.isArray(residentsResponse.data)
      ? residentsResponse.data
      : [residentsResponse.data];

    return { location, residents };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch location details.");
    }

    return rejectWithValue("An unknown error occurred.");
  }
});

const locationDetailsSlice = createSlice({
  name: "locationDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.residents = [];
      })
      .addCase(fetchLocationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.location = action.payload.location;
        state.residents = action.payload.residents;
      })
      .addCase(fetchLocationById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An error occurred.";
      });
  }
});

export default locationDetailsSlice.reducer;
