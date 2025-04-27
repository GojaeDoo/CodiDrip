import styled from "styled-components";

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

export const ProfileEditWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 2vh;
  width: 50vw;
  height: 50vh;
  background-color: #1a1a1a;
  border-radius: 5px;
  padding: 5vh 5vw 5vh 5vw;

  display: flex;
  flex-direction: row;
`;

export const ProfileEditWrapperLeft = styled.div`
  width: 50%;
  height: 100%;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileEditImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 50%;
`;

export const ProfileEditWrapperRight = styled.div`
  width: 50%;
  height: 100%;
  background-color: #1a1a1a;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfileEditTitle = styled.div`
  font-size: 2rem;
  font-weight: 1000;
  color: #ffffff;
`;

export const ProfileEditText = styled.div`
  font-size: 1rem;
  font-weight: 1000;
  color: #ffffff;
  text-align: left;
  width: 100%;
`;

export const ProfileEditSelect = styled.select`
  width: 20vw;
  height: 5vh;
  font-size: 1rem;
  background-color: rgba(217, 217, 217, 0.9);
  outline: none;
  border: 1px solid rgba(217, 217, 217, 0.9);
  border-radius: 5px;
  padding-left: 1vw;
`;

// ProfileEdit.styled.ts
export const FileInputLabel = styled.label`
  display: inline-block;
  padding: 0.7em 1.5em;
  background: #6c63ff;
  color: #fff;
  border-radius: 7px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 1rem;
  &:hover {
    background: #5548c8;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;
