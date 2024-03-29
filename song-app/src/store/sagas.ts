// sagas.js
import {
  CallEffect,
  PutEffect,
  all,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../models/song-model.model";
import { createSongSuccess, deleteSongSuccess, updateSongSuccess } from "./song/song-state.state";

// Action types
const CREATE_SONG_REQUEST = "songs/createSongRequest";
const CREATE_SONG_SUCCESS = "songs/createSongSuccess";
const CREATE_SONG_FAILURE = "songs/createSongFailure";

const UPDATE_SONG_REQUEST = "songs/updateSongRequest";
const UPDATE_SONG_SUCCESS = "songs/updateSongSuccess";
const UPDATE_SONG_FAILURE = "songs/updateSongFailure";

const DELETE_SONG_REQUEST = "songs/deleteSongRequest";
const DELETE_SONG_SUCCESS = "songs/deleteSongSuccess";
const DELETE_SONG_FAILURE = "songs/deleteSongFailure";

function* createSongSaga(
  action: PayloadAction<Omit<Song, "id">>
): Generator<CallEffect | PutEffect, void, AxiosResponse<any>> {
  try {
    const response: AxiosResponse<any> = yield call(
      axios.post,
      "https://addis-songs.onrender.com/api/songs",
      action.payload
    );
    console.log("response", response.data);
    yield put(createSongSuccess(response.data));
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      yield put({ type: "CREATE_SONG_FAILURE", payload: error.response?.data });
    } else {
      yield put({
        type: "CREATE_SONG_FAILURE",
        payload: "An unexpected error occurred",
      });
    }
  }
}

function* updateSongSaga(
  action: PayloadAction<Song>
): Generator<CallEffect | PutEffect, void, AxiosResponse<any>> {
  try {
    const { _id, __v, ...requestBody } = action.payload;
    console.log("action.payload", requestBody);
    const response: AxiosResponse<any> = yield call(
      axios.put,
      `https://addis-songs.onrender.com/api/songs/${action.payload._id}`,
      requestBody
    );
    yield put(updateSongSuccess(response.data));
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Assuming the error response is structured and includes a message
      yield put({
        type: "UPDATE_SONG_FAILURE",
        payload: error.response?.data.message || "An unknown error occurred",
      });
    } else {
      yield put({
        type: "UPDATE_SONG_FAILURE",
        payload: "An unexpected error occurred",
      });
    }
  }
}

function* deleteSongSaga(action: PayloadAction<string>): Generator {
  try {
    console.log("action.payload", action.payload);
    yield call(
      axios.delete,
      `https://addis-songs.onrender.com/api/songs/${action.payload}`
    );
    yield put(deleteSongSuccess(action.payload));
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      yield put({
        type: "DELETE_SONG_FAILURE",
        payload: error.response?.data.message || "An unknown error occurred",
      });
    } else {
      yield put({
        type: "DELETE_SONG_FAILURE",
        payload: "An unexpected error occurred",
      });
    }
  }
}

function* fetchSongsSaga() {
  try {
    const response: AxiosResponse<Song[]> = yield call(
      axios.get,
      "https://addis-songs.onrender.com/api/songs"
    );
    yield put({ type: "songs/fetchSongsSuccess", payload: response.data });
  } catch (error: any) {
    yield put({
      type: "songs/fetchSongsFailure",
      payload: "Failed to fetch songs",
    });
  }
}

function* watchFetchSongs() {
  yield takeLatest("songs/fetchSongsRequest", fetchSongsSaga);
}

function* watchCreateSong() {
  yield takeLatest(CREATE_SONG_REQUEST, createSongSaga);
}

function* watchUpdateSong() {
  yield takeLatest(UPDATE_SONG_REQUEST, updateSongSaga);
}

function* watchDeleteSong() {
  yield takeLatest(DELETE_SONG_REQUEST, deleteSongSaga);
}

export default function* rootSaga() {
  yield all([watchCreateSong(), watchUpdateSong(), watchDeleteSong(), watchFetchSongs()]);
}
