import styled from "styled-components";

export const Background = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: var(--background);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 0;
  transition: background-color 0.3s ease;

  @media (max-width: 900px) {
    padding: 2rem 0;
  }
  @media (max-width: 768px) {
    padding: 1.2rem 0;
  }
  @media (max-width: 480px) {
    padding: 0.5rem 0;
  }
`;

export const DripPostEditWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  background: var(--card-bg);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
  @media (max-width: 900px) {
    max-width: 100vw;
    border-radius: 0;
  }
  @media (max-width: 768px) {
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
  background: var(--card-bg);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  @media (min-width: 900px) {
    width: 55%;
    min-height: 540px;
  }
  @media (max-width: 768px) {
    min-height: 120px;
  }
  @media (max-width: 480px) {
    min-height: 80px;
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
  background: var(--card-border);
  transition: background-color 0.3s ease;
  @media (max-width: 768px) {
    min-height: 100px;
  }
  @media (max-width: 480px) {
    min-height: 60px;
  }
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
  @media (max-width: 768px) {
    border-radius: 6px;
  }
  @media (max-width: 480px) {
    border-radius: 4px;
  }
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
  color: var(--text-primary);
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
    background: var(--success);
    color: var(--text-primary);
    transform: scale(1.08);
  }
`;

export const ContentSection = styled.div`
  width: 100%;
  background: var(--card-bg);
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: 1rem 0.5rem;
  transition: background-color 0.3s ease;
  @media (min-width: 900px) {
    width: 45%;
    min-height: 540px;
    padding: 2rem 1.2rem;
  }
  @media (max-width: 768px) {
    gap: 0.9rem;
    padding: 0.7rem 0.2rem;
  }
  @media (max-width: 480px) {
    gap: 0.7rem;
    padding: 0.4rem 0.1rem;
  }
`;

export const DripPostEditTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }
`;

export const ImageUploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.7rem;
  background: var(--accent);
  color: var(--text-primary);
  border-radius: 8px;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 0.7rem;
  min-height: 40px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.08);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: var(--accent-hover);
    transform: translateY(-2px) scale(1.04);
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.5rem;
    border-radius: 6px;
    margin-bottom: 0.5rem;
    min-height: 38px;
  }
  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.3rem;
    border-radius: 4px;
    margin-bottom: 0.4rem;
    min-height: 36px;
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
  border: 1.5px solid var(--card-border);
  border-radius: 12px;
  background: var(--card-bg);
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const TagInput = styled.input`
  width: 100%;
  padding: 0.3rem 0.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  background: transparent;
  color: var(--text-primary);
  outline: none;
  min-height: 40px;
  margin-bottom: 0.7rem;
  transition: color 0.3s ease;
  &::placeholder {
    color: var(--text-muted);
    font-size: 0.85rem;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.3rem;
    min-height: 38px;
    margin-bottom: 0.5rem;
  }
  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.1rem 0.2rem;
    min-height: 36px;
    margin-bottom: 0.4rem;
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

export const TagItem = styled.span`
  background: var(--card-border);
  color: var(--text-primary);
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(16, 185, 129, 0.08);
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.15rem 0.3rem;
  }
  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.1rem 0.2rem;
  }
`;

export const TagDeleteButton = styled.button`
  margin-left: 8px;
  background: transparent;
  border: none;
  color: var(--danger);
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: color 0.3s ease;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.7rem;
  @media (max-width: 768px) {
    gap: 0.3rem;
    margin-top: 0.3rem;
  }
  @media (max-width: 480px) {
    gap: 0.2rem;
    margin-top: 0.1rem;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 0.5rem 0;
  background: linear-gradient(90deg, #10b981 0%, #2563eb 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  min-height: 40px;
  margin-bottom: 0.2rem;
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
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.3rem 0;
    border-radius: 6px;
    min-height: 38px;
    margin-bottom: 0.15rem;
  }
  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0;
    border-radius: 4px;
    min-height: 36px;
    margin-bottom: 0.1rem;
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
