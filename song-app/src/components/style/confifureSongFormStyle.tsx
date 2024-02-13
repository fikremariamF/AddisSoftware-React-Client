/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const StyledForm = styled.form`
  max-width: 40rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

export const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
`;

export const CloseButton = styled.button`
  padding: 10px 15px;
  background-color: transparent; // Transparent background
  color: #333; // Text color that contrasts with the background
  border: 1px solid grey; // Grey border
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    border-color: #fff;
  }
`;

export const Container = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  border: none;
`;

export const StyledSelect = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; /* Optional: Adjust width as needed */
  background-color: white; /* Optional: Change background color */
  color: black; /* Optional: Change text color */
  -webkit-appearance: none; /* Removes default styling for select on WebKit browsers */
  -moz-appearance: none; /* Removes default styling for select on Mozilla browsers */
  appearance: none; /* Removes default styling for modern browsers */
  &:focus {
    outline: none;
    border-color: #007bff; /* Change to any color you prefer */
  }
`;

export const Statistics = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: white;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
`;