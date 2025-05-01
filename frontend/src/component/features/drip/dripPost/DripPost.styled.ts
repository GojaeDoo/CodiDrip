import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  padding: 2vw;
  justify-content: center;
`;

export const DripPostContainer = styled.div`
  width: 14vw;
  height: 42vh;
  border-radius: 1vw;
  overflow: hidden;
  box-shadow: 0 0.3vw 1vw rgba(0, 0, 0, 0.15);
  background-color: white;
  position: relative;
  min-width: 250px;
  max-width: 350px;

  &:hover {
    scale: 1.05;
    transition: scale 0.2s ease;
  }
`;

export const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PostInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.2vw;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
`;

export const ProfileImage = styled.img`
  width: 3.2vw;
  height: 3.2vw;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
`;

export const ProfileDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8vw;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3vw;
`;

export const ProfileName = styled.h2`
  font-size: 1.4vw;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.6vw;
  min-font-size: 18px;

  &:after {
    content: attr(data-age);
    font-size: 1.2vw;
    font-weight: 400;
  }
`;

export const ProfileDetail = styled.p`
  font-size: 1vw;
  margin: 0;
  opacity: 0.9;
  min-font-size: 14px;
`;

export const CardNumber = styled.div`
  position: absolute;
  top: 1.2vw;
  left: 1.2vw;
  width: 2.4vw;
  height: 2.4vw;
  min-width: 28px;
  min-height: 28px;
  background-color: rgba(255, 216, 0, 0.9);
  border-radius: 0.4vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2vw;
  font-weight: bold;
  color: black;
  z-index: 2;
`;

export const LikeButton = styled.div`
  position: absolute;
  top: 1.2vw;
  right: 1.2vw;
  width: 2.4vw;
  height: 2.4vw;
  min-width: 28px;
  min-height: 28px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0.15vw 0.6vw rgba(0, 0, 0, 0.1);
  z-index: 2;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }
`;

export const HeartIcon = styled.div<{ $isLiked: boolean }>`
  width: 1.2vw;
  height: 1.2vw;
  min-width: 18px;
  min-height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.2);
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({ $isLiked }) =>
      $isLiked ? "rgba(255, 75, 75, 0.2)" : "rgba(0, 0, 0, 0.1)"};
    transform: scale(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scale(1.5);
  }

  svg {
    width: 100%;
    height: 100%;
    color: ${({ $isLiked }) => ($isLiked ? "#ff4b4b" : "#000")};
    fill: ${({ $isLiked }) => ($isLiked ? "#ff4b4b" : "none")};
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
  }

  &:hover svg {
    transform: scale(1.1);
    color: ${({ $isLiked }) => ($isLiked ? "#ff1a1a" : "#ff4b4b")};
  }
`;
