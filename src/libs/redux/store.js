import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./slices/charactersSlice";
import episodesReducer from "./slices/episodesSlice";
import locationsReducer from "./slices/locationsSlice";
import characterDetailsReducer from "./slices/characterDetailsSlice";
import locationDetailsReducer from "./slices/locationDetailsSlice";
import episodeDetailsReducer from "./slices/episodeDetailsSlice";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    episodes: episodesReducer,
    locations: locationsReducer,
    characterDetails: characterDetailsReducer,
    locationDetails: locationDetailsReducer,
    episodeDetails: episodeDetailsReducer,
  },
});

export default store;
