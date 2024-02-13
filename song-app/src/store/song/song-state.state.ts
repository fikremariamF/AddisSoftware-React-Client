import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface SongsState {
  songs: Song[];
}

const initialState: SongsState = {
  songs: [],
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    // Action to trigger song creation from a component, caught by a saga
    createSongRequest(state, action: PayloadAction<Omit<Song, "id">>) {},
    createSongSuccess(state, action: PayloadAction<Song>) {
      console.log("fff",action.payload)
      state.songs.push(action.payload);
    },
    createSongFailure(state, action: PayloadAction<string>) {},

    // Similar structure for update and delete operations
    updateSongRequest(state, action: PayloadAction<Song>) {},
    updateSongSuccess(state, action: PayloadAction<Song>) {
      const index = state.songs.findIndex(
        (song) => song.id === action.payload.id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    updateSongFailure(state, action: PayloadAction<string>) {},

    deleteSongRequest(state, action: PayloadAction<string>) {},
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    },
    deleteSongFailure(state, action: PayloadAction<string>) {},
  },
});

export const {
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} = songSlice.actions;

export default songSlice.reducer;
