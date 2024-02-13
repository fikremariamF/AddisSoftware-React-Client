import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Song } from "../../models/song-model.model";

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
    fetchSongsRequest(state) {
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
    },
    createSongRequest(state, action: PayloadAction<Omit<Song, "id">>) {},
    createSongSuccess(state, action: PayloadAction<Song>) {
      console.log("fff", action.payload);
      state.songs.push(action.payload);
    },
    createSongFailure(state, action: PayloadAction<string>) {},

    updateSongRequest(state, action: PayloadAction<Song>) {},
    updateSongSuccess(state, action: PayloadAction<Song>) {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    updateSongFailure(state, action: PayloadAction<string>) {},

    deleteSongRequest(state, action: PayloadAction<string>) {},
    deleteSongSuccess(state, action: PayloadAction<string>) {
      console.log("delete.payload", action.payload);
      state.songs = state.songs.filter((song) => song._id !== action.payload);
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
