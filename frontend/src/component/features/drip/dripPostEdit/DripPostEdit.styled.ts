import styled from "styled-components";

export const Background = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #1a1a1a);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 0;
`;

export const DripPostEditWrapper = styled.div`
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

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 900px) {
    flex-direction: row;
    min-height: 540px;
  }
`;

export const ImageSection = styled.div`
  width: 100%;
  background: #1a1a1a;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 900px) {
    width: 55%;
    min-height: 540px;
  }
`;

export const ImageWrapper = styled.div<{ $aspectRatio: string }>`
  width: 100%;
  height: 100%;
  min-height: 320px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: ${(props) => props.$aspectRatio};
  background: #111;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
`;

export const ImageNavigation = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  pointer-events: none;
`;

export const NavButton = styled.button`
  background: rgba(36, 37, 46, 0.7);
  border: none;
  color: #fff;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: #10b981;
    color: #fff;
    transform: scale(1.08);
  }
`;

export const ContentSection = styled.div`
  width: 100%;
  background: #1e1e1e;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.5rem 2rem;
  @media (min-width: 900px) {
    width: 45%;
    min-height: 540px;
    padding: 3rem 2.5rem;
  }
`;

export const DripPostEditTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
`;

export const ImageUploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.7rem;
  background: #ffffff;
  color: #000000;
  border-radius: 16px;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.08);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: linear-gradient(90deg, #2563eb 0%, #10b981 100%);
    transform: translateY(-2px) scale(1.04);
  }
`;

export const TagSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const TagInputWrapper = styled.form`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.9rem 1.2rem;
  border: 1.5px solid #31313a;
  border-radius: 12px;
  background: #18181b;
`;

export const TagInput = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background: transparent;
  color: #fff;
  outline: none;
  &::placeholder {
    color: #a1a1aa;
    font-size: 1rem;
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

export const TagItem = styled.span`
  background: linear-gradient(90deg, #23232b 0%, #18181b 100%);
  color: #fff;
  padding: 0.5rem 1.2rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(16, 185, 129, 0.08);
  display: flex;
  align-items: center;
`;

export const TagDeleteButton = styled.button`
  margin-left: 8px;
  background: transparent;
  border: none;
  color: #ff3b30;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 2rem;
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 1rem 0;
  background: linear-gradient(90deg, #10b981 0%, #2563eb 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.08);
  transition: background 0.2s, transform 0.2s;
  &:hover:not(:disabled) {
    background: linear-gradient(90deg, #2563eb 0%, #10b981 100%);
    transform: translateY(-2px) scale(1.04);
  }
  &:disabled {
    background: #31313a;
    color: #888;
    cursor: not-allowed;
  }
`;

export const DripPostEditContent = styled.div`
  display: block;
  width: 100vw;
  max-width: 700px;
  margin: 0 auto;
  padding: 0;
`;

export const ImageUploadSection = styled.div`
  width: 100vw;
  max-width: 700px;
  margin: 0 auto;
  padding: 0;
  background: none;
`;

export const PinContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const PinMarker = styled.div`
  width: 28px;
  height: 28px;
  background-color: #ff4d4d;
  border-radius: 50%;
  border: 2px solid #1e1e1e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const PinDescription = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2d2d2d;
  color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  margin-top: 8px;
  font-size: 0.9rem;
  z-index: 3;

  ${PinContainer}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

export const Pin = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
`;

export const PinDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: #ff4444;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const PinTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  margin-bottom: 8px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;

  ${Pin}:hover & {
    opacity: 1;
  }
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

export const PinButton = styled.button<{ $isActive?: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${({ $isActive }) => ($isActive ? "#2563eb" : "#1d1d1d")};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? "#1d4ed8" : "#2563eb")};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #2d2d2d;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalTitle = styled.h2`
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #404040;
  border-radius: 4px;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 1.5rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }

  &::placeholder {
    color: #666666;
  }
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const ModalButton = styled.button<{ $primary?: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${({ $primary }) => ($primary ? "#2563eb" : "#1d1d1d")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $primary }) => ($primary ? "#1d4ed8" : "#2563eb")};
  }
`;

export const DeleteImageButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  z-index: 10;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
