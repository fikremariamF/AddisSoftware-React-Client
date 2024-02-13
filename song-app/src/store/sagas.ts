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
      "http://localhost:5001/api/songs",
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
    const response: AxiosResponse<any> = yield call(
      axios.put,
      `http://localhost:5001/api/songs/${action.payload.id}`,
      action.payload
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
    yield call(
      axios.delete,
      `http://localhost:5001/api/songs/${action.payload}`
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
  yield all([watchCreateSong(), watchUpdateSong(), watchDeleteSong()]);
}
