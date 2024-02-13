/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const Container = styled.div`
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

export const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  align-atems: flex-start;
  justtify-content: flex-start;
  max-height: 80vh;
  overflow: scroll;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const ListItem = styled.div`
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

export const H2 = styled.h2`
  margin: 1rem;
  font-size: 2rem;
`;

export const DiscImage = styled.img`
  width: 7rem;
  height: auto;
  object-fit: contain;
`;

export const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SidebarContainer = styled.div`
  max-width: 50rem; // Width of the sidebar
  height: 100%;
  background: #ffffff; // White background
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1); // Shadow for depth
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledButton = styled.button`
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

export const NoSongsMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  margin: auto;
  font-size: 1.4rem;
`;

export const MoreOptions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 30rem;
  height: 2rem;
`;

export const OptionsMenu = styled.div`
  display: none;
  position: absolute;
  right: 0px;
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

export const OptionButton = styled.button`
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

export const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const Divider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
`;

