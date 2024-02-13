/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { useState } from "react";
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
} from "../store/song/song-state.state";

// Styled components using Emotion
const Container = styled.div`
  width: 100vw;
  height: 100%;
  background-color: #ffffff;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  gap: 2rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  align-atems: flex-start;
  justtify-content: flex-start;
  max-height: 90vh;
  overflow: scroll;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ListItem = styled.div`
  background: #ffffff; // White background for the card
  border-radius: 8px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  margin: 20px; // Add margin to space out the cards
  transition: transform 0.2s; // Smooth transition for hover effect
  position: relative;

  &:hover {
    transform: translateY(-5px); // Slight raise effect on hover
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15); // Deeper shadow on hover
  }
`;

const H2 = styled.h2`
  margin: 1rem;
  font-size: 2rem;
`;

const DiscImage = styled.img`
  width: 7rem;
  height: auto;
  object-fit: contain;
`;

const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SidebarContainer = styled.div`
  max-width: 50rem; // Width of the sidebar
  height: 100%;
  background: #ffffff; // White background
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1); // Shadow for depth
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
  align-self: flex-end;
  margin-right: 20%;
`;

const NoSongsMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  margin: auto;
  font-size: 1.4rem;
`;

const MoreOptions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const OptionsMenu = styled.div`
  display: none;
  position: absolute;
  right:0px;
  top: 0px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0px;
  z-index: 10;
  width: 5rem;
  height: 3rem;

  ${MoreOptions}:hover & {
    display: block;
  }
`;

const OptionButton = styled.button`
  display: block;
  background: none;
  border: none;
  padding: 2px;
  width: 100%;
  height: 1.5rem;
  text-align: left;

  &:hover {
    background-color: #f0f0f0;
  }

  &:hover ${OptionsMenu} {
    display: block;
  }
`;

const SongList: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<Song | undefined>(undefined);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [resetFormKey, setResetFormKey] = useState(Date.now());

  const songs = useSelector((state: RootState) => state.songs.songs);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = (songData: Omit<Song, "id">) => {
    if (selectedSong) {
      dispatch(updateSongRequest({ ...songData, id: selectedSong!.id! }));
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

  const handleDelete = (id: string) => {
    dispatch(deleteSongRequest(id));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) setResetFormKey(Date.now());
  };

  return (
    <Container>
      <Main>
        <H2>Song List</H2>
        <List>
          {songs.length === 0 ? (
            <NoSongsMessage>No songs available. Add some!</NoSongsMessage>
          ) : (
            songs.map((song) => (
              <ListItem key={song.id}>
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
                    <OptionButton onClick={() => handleDelete(song.id)}>
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
                setSelectedSong(undefined); // Reset selected song on close
              }}
            />
          </SidebarContainer>
        )}
      </div>
    </Container>
  );
};

export default SongList;
