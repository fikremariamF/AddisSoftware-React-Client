/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { Song } from "../models/song-model.model";
import {
  StyledForm,
  StyledInput,
  StyledButton,
  CloseButton,
  Container,
  StyledSelect
} from './style/confifureSongFormStyle'; 


interface SongFormProps {
  song?: Song;
  onSave: (song: Song) => void;
  onUpdate?: (song: Song) => void;
  onClose: () => void;
}

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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      <StyledSelect
        name="genre"
        value={formState.genre}
        onChange={handleChange}
        required
      >
        <option value="">Select Genre</option>
        <option value="Pop">Pop</option>
        <option value="Rock">Rock</option>
        <option value="Jazz">Jazz</option>
        <option value="Classical">Classical</option>
        <option value="Electronic">Electronic</option>
        <option value="Reggae">Reggae</option>
        <option value="Other">Other</option>
      </StyledSelect>

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
