import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  box-sizing: border-box;
  transition: background-color 0.3s ease;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

export const ProfileEditTitle = styled.div`
  font-size: 2rem;
  font-weight: 1000;
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
`;

export const ProfileEditWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #1a1a1a;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 3rem;
    gap: 4rem;
  }
`;

export const ProfileEditWrapperLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

export const ProfileEditImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;

  @media (min-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

export const ProfileEditWrapperRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    width: 60%;
  }
`;

export const ProfileEditText = styled.div`
  font-size: 1rem;
  font-weight: 1000;
  color: #ffffff;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const ProfileNicknameCheckButton = styled.button`
  height: 45px;
  background-color: rgba(217, 217, 217, 0.9);
  outline: none;
  border: none;
  border: 1px solid rgba(217, 217, 217, 0.9);
  border-radius: 5px;
  padding: 0 1rem;
  font-size: 1rem;
  white-space: nowrap;
  min-width: 80px;

  &:hover {
    background-color: #262a2d;
    color: #ffffff;
  }

  @media (min-width: 768px) {
    height: 50px;
    font-size: 1.1rem;
    min-width: 100px;
  }
`;

export const InputWithButton = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;

  input {
    flex: 1;
    height: 45px;
    font-size: 1rem;
    background-color: rgba(217, 217, 217, 0.9);
    outline: none;
    border: 1px solid rgba(217, 217, 217, 0.9);
    border-radius: 5px;
    padding: 0 1rem;

    @media (min-width: 768px) {
      height: 50px;
      font-size: 1.1rem;
    }
  }
`;

export const ProfileEditSelect = styled.select`
  width: 100%;
  height: 45px;
  font-size: 1rem;
  background-color: rgba(217, 217, 217, 0.9);
  outline: none;
  border: 1px solid rgba(217, 217, 217, 0.9);
  border-radius: 5px;
  padding: 0 1rem;

  @media (min-width: 768px) {
    height: 50px;
    font-size: 1.1rem;
  }
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  padding: 0.7em 1.5em;
  background: #333;
  color: #fff;
  border-radius: 7px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;

  &:hover {
    background: #444;
  }

  @media (min-width: 768px) {
    width: auto;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const SubmitButton = styled.button`
  width: 100%;
  max-width: 800px;
  height: 50px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 7px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 2rem;

  &:hover {
    background: #444;
  }

  @media (min-width: 768px) {
    height: 55px;
    font-size: 1.2rem;
  }
`;

export const ProfileEditTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 1rem;
  background-color: rgba(217, 217, 217, 0.9);
  border:none;
  border-radius: 5px;
  resize: none;
`;