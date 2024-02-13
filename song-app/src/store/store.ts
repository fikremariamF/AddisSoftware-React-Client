import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./song/song-state.state";

const store = configureStore({
  reducer: {
    songs: songReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
