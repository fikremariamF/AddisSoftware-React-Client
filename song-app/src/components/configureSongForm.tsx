/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { Song } from "../models/song-model.model";

interface SongFormProps {
  song?: Song;
  onSave: (song: Song) => void;
  onUpdate?: (song: Song) => void;
  onClose: () => void;
}

const StyledForm = styled.form`
  max-width: 40rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
`;

const CloseButton = styled.button`
  padding: 10px 15px;
  background-color: transparent; // Transparent background
  color: #333; // Text color that contrasts with the background
  border: 1px solid grey; // Grey border
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: rgba(
      0,
      0,
      0,
      0.2
    );
    border-color: #fff; 
  }
`;

const Container = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  border: none;
`;

const SongForm: React.FC<SongFormProps> = ({
  song,
  onSave,
  onUpdate,
  onClose,
}) => {
  const [formState, setFormState] = useState<Song>({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  useEffect(() => {
    if (song) setFormState(song);
  }, [song]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (song && onUpdate) {
      onUpdate(formState);
    } else {
      onSave(formState);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        name="title"
        value={formState.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <StyledInput
        name="artist"
        value={formState.artist}
        onChange={handleChange}
        placeholder="Artist"
        required
      />
      <StyledInput
        name="album"
        value={formState.album}
        onChange={handleChange}
        placeholder="Album"
        required
      />
      <StyledInput
        name="genre"
        value={formState.genre}
        onChange={handleChange}
        placeholder="Genre"
        required
      />

      <Container>
        <CloseButton onClick={onClose}>Close</CloseButton>

        <StyledButton type="submit">
          {song ? "Update Song" : "Add Song"}
        </StyledButton>
      </Container>
    </StyledForm>
  );
};

export default SongForm;
