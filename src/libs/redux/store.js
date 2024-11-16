import { configureStore } from "@reduxjs/toolkit";

import characterDetailsReducer from "./slices/characterDetailsSlice";
import characterEpisodesReducer from "./slices/characterEpisodesSlice";
import charactersReducer from "./slices/charactersSlice";
import episodeDetailsReducer from "./slices/episodeDetailsSlice";
import episodesReducer from "./slices/episodesSlice";
import locationDetailsReducer from "./slices/locationDetailsSlice";
import locationsReducer from "./slices/locationsSlice";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    episodes: episodesReducer,
    locations: locationsReducer,
    characterDetails: characterDetailsReducer,
    locationDetails: locationDetailsReducer,
    episodeDetails: episodeDetailsReducer,
    characterEpisodes: characterEpisodesReducer
  }
});

export default store;
