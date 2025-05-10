import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a1a;
  padding: 2rem;
`;

export const DripPostEditWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const DripPostEditTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #ffffff;
`;

export const DripPostEditContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ImageUploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ImageUploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #1d1d1d;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: #222;
  border-radius: 8px;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  display: block;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavigationButton = styled.button<{ position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ position }) => (position === "left" ? "left: 1rem;" : "right: 1rem;")}
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

export const PlaceholderText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666666;
  font-size: 1.125rem;
`;

export const TagSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TagInputWrapper = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #404040;
  border-radius: 4px;
  background-color: #1a1a1a;
`;

export const TagInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  background-color: transparent;
  color: #ffffff;

  &::placeholder {
    color: #666666;
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const TagItem = styled.span`
  background-color: #404040;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #ffffff;
`;

export const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #059669;
  }

  &:disabled {
    background-color: #404040;
    cursor: not-allowed;
  }
`;

export const TagDeleteButton = styled.button`
  margin-left: 4px;
  background: transparent;
  border: none;
  color: #ff3b30;
  cursor: pointer;
  font-weight: bold;
`;
