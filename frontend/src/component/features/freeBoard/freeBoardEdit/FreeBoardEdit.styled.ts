import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  background: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 0;
`;

export const FreeBoardEditWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  background: #1a1a1a;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  @media (max-width: 900px) {
    max-width: 100vw;
    border-radius: 0;
  }
`;

export const Header = styled.div`
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid #333;
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
`;

export const Subtitle = styled.p`
  color: #888;
  font-size: 1rem;
  margin: 0;
`;

export const Form = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
`;

export const TitleInput = styled.input`
  width: 100%;
  padding: 1rem;
  background: #2a2a2a;
  border: 2px solid #333;
  border-radius: 12px;
  color: #ffffff;
  font-size: 1.1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4a9eff;
  }

  &::placeholder {
    color: #666;
  }
`;

export const ContentTextarea = styled.textarea`
  width: 100%;
  min-height: 400px;
  padding: 1rem;
  background: #2a2a2a;
  border: 2px solid #333;
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4a9eff;
  }

  &::placeholder {
    color: #666;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #333;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #444;
  }
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${props => props.disabled ? '#555' : '#4a9eff'};
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.disabled ? '#555' : '#3a8eef'};
  }
`;

export const CharacterCount = styled.div`
  color: #888;
  font-size: 0.875rem;
  text-align: right;
  margin-top: 0.5rem;
`;

