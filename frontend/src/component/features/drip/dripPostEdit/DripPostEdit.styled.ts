import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

export const DripPostEditWrapper = styled.div`
  width: 40vw;
  min-height: 60vh;
  background: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const DripPostEditTitle = styled.h1`
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 24px;
  font-weight: 600;
`;

export const DripPostEditContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ImageUploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ImageUploadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  background: #2a2a2a;
  border: 2px dashed #3a3a3a;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #3a3a3a;
    border-color: #4a4a4a;
  }

  span {
    font-size: 14px;
    font-weight: 500;
  }
`;

export const ImagePreview = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

export const TagSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TagInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #2a2a2a;
  border-radius: 8px;
  border: 1px solid #3a3a3a;
`;

export const TagInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #666;
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 4vh;
  background-color: rgba(217, 217, 217, 0.9);
  outline: none;
  border: 1px solid rgba(217, 217, 217, 0.9);
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #262a2d;
    color: #ffffff;
  }
`;
