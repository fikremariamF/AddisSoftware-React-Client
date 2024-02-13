/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { } from "../store/song/song-state.state";
import rotatingDiskGif from "../assets/rolling-disk.gif"; 
import SongForm from "./configureSongForm";
import { Song } from "../models/song-model.model";
import {
  createSongRequest,
  updateSongRequest,
  deleteSongRequest,
  fetchSongsRequest
} from "../store/song/song-state.state";
import Select from "react-select";

import {
  Container,
  List,
  Main,
  ListItem,
  H2,
  DiscImage,
  SongDetails,
  SidebarContainer,
  StyledButton,
  NoSongsMessage,
  MoreOptions,
  Input,
  OptionsMenu,
  OptionButton,
  Div,
  Divider,
} from './style/songListStyle';
import SongStatistics from "./statistics";


const SongList: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<Song | undefined>(undefined);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [resetFormKey, setResetFormKey] = useState(Date.now());
  const [genreFilter, setGenreFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  const songs = useSelector((state: RootState) => state.songs.songs);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const genreOptions = [
    { value: "Pop", label: "Pop" },
    { value: "Rock", label: "Rock" },
    { value: "Jazz", label: "Jazz" },
    { value: "Classical", label: "Classical" },
    { value: "Electronic", label: "Electronic" },
    { value: "Reggae", label: "Reggae" },
    { value: "Folk", label: "Folk" },
    { value: "Blues", label: "Blues" },
    { value: "Country", label: "Country" },
    { value: "Hip-Hop", label: "Hip-Hop" },
    { value: "Other", label: "Other" },
  ];

  const handleGenreChange = (selectedOptions: any) => {
    setGenreFilter(selectedOptions);
  };

  const filteredSongs = songs.filter((song) => {
    const genreMatches =
      genreFilter.length === 0 ||
      genreFilter.some((g: any) => song.genre === g.value);
    const queryMatches =
      searchQuery.length === 0 ||
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return genreMatches && queryMatches;
  });

  const handleSave = (songData: Omit<Song, "id">) => {
    if (selectedSong) {
      dispatch(updateSongRequest({ ...songData, _id: selectedSong!._id! }));
    } else {
      dispatch(createSongRequest(songData));
    }
    setIsFormVisible(false);
    setSelectedSong(undefined);
  };

  const handleEdit = (song: Song) => {
    setSelectedSong(song);
    setIsFormVisible(true);
  };

  const handleDelete = (song: Song) => {
    console.log("deleting song", song);
    dispatch(deleteSongRequest(song._id!));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) setResetFormKey(Date.now());
  };

  return (
    <Container>
      <Main>
        <Div>
          <H2>Song List</H2>
          <Divider>
            <Div>
              <label>Search:</label>
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Div>
            <Div>
              <label>Genre:</label>
              <Select
                isMulti
                options={genreOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleGenreChange}
                closeMenuOnSelect={false}
                styles={{
                  container: (base) => ({
                    ...base,
                    minWidth: "15rem",
                    maxWidth: "20rem",
                    height: "2rem",
                    marginTop: "-.5rem",
                  }),
                }}
              />{" "}
            </Div>
          </Divider>
        </Div>
        <SongStatistics></SongStatistics>
        <List>
          {filteredSongs.length === 0 ? (
            <NoSongsMessage>No songs available. Add some!</NoSongsMessage>
          ) : (
            filteredSongs.map((song) => (
              <ListItem key={song._id}>
                <DiscImage src={rotatingDiskGif} alt="Rotating disc" />
                <SongDetails>
                  <strong>{song.title}</strong>
                  <div>{song.artist}</div>
                  <div>Album: {song.album}</div>
                  <div>Genre: {song.genre}</div>
                </SongDetails>
                <MoreOptions>
                  <span>⋮</span>
                  <OptionsMenu>
                    <OptionButton onClick={() => handleEdit(song)}>
                      Edit
                    </OptionButton>
                    <OptionButton onClick={() => handleDelete(song)}>
                      Delete
                    </OptionButton>
                  </OptionsMenu>
                </MoreOptions>
              </ListItem>
            ))
          )}
        </List>
        {!isFormVisible && (
          <StyledButton onClick={toggleFormVisibility}>
            {isFormVisible ? "Close" : "Add Song"}
          </StyledButton>
        )}
      </Main>
      <div>
        {isFormVisible && (
          <SidebarContainer>
            <SongForm
              key={resetFormKey}
              song={selectedSong}
              onSave={handleSave}
              onUpdate={handleSave}
              onClose={() => {
                setIsFormVisible(false);
                setSelectedSong(undefined);
              }}
            />
          </SidebarContainer>
        )}
      </div>
    </Container>
  );
};

export default SongList;
