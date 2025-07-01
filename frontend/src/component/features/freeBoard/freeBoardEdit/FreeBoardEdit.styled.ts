import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  background: var(--background);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 0;
  transition: background-color 0.3s ease;
`;

export const FreeBoardEditWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  @media (max-width: 900px) {
    max-width: 100vw;
    border-radius: 0;
  }
`;

export const Header = styled.div`
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid var(--card-border);
  transition: border-color 0.3s ease;
`;

export const Title = styled.h1`
  color: var(--text-primary);
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  transition: color 0.3s ease;
`;

export const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0;
  transition: color 0.3s ease;
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
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.3s ease;
`;

export const TitleInput = styled.input`
  width: 100%;
  padding: 1rem;
  background: var(--card-border);
  border: 2px solid var(--card-border);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 1.1rem;
  transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const ContentTextarea = styled.textarea`
  width: 100%;
  min-height: 400px;
  padding: 1rem;
  background: var(--card-border);
  border: 2px solid var(--card-border);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  &::placeholder {
    color: var(--text-muted);
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
  background: var(--card-border);
  border: none;
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    color: var(--text-primary);
  }
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${props => props.disabled ? 'var(--text-muted)' : 'var(--button-bg)'};
  border: none;
  border-radius: 8px;
  color: var(--button-text);
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background: ${props => props.disabled ? 'var(--text-muted)' : 'var(--button-hover)'};
  }
`;

export const CharacterCount = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-align: right;
  margin-top: 0.5rem;
  transition: color 0.3s ease;
`;

