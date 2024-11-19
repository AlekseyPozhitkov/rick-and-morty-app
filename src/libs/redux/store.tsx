import { configureStore } from "@reduxjs/toolkit";

import characterDetailsReducer from "./slices/characterDetailsSlice";
import charactersReducer from "./slices/charactersSlice";
import episodeDetailsReducer from "./slices/episodeDetailsSlice";
import episodesReducer from "./slices/episodesSlice";
import locationDetailsReducer from "./slices/locationDetailsSlice";
import locationsReducer from "./slices/locationsSlice";

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    episodes: episodesReducer,
    locations: locationsReducer,
    characterDetails: characterDetailsReducer,
    locationDetails: locationDetailsReducer,
    episodeDetails: episodeDetailsReducer
  }
});

export default store;
