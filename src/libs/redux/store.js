import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./slices/charactersSlice";
import episodesReducer from "./slices/episodesSlice";
import locationsReducer from "./slices/locationsSlice";
import characterDetailsReducer from "./slices/characterDetailsSlice";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    episodes: episodesReducer,
    locations: locationsReducer,
    characterDetails: characterDetailsReducer,
  },
});

export default store;
