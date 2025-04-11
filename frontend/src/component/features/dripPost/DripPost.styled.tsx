import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  padding: 2vw;
  justify-content: center;
`;

export const DripPostContainer = styled.div`
  position: relative;
  width: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CardNumber = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
`;

export const LikeButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
`;

export const HeartIcon = styled.div<{ $isLiked: boolean }>`
  color: ${(props) => (props.$isLiked ? "red" : "white")};
  transition: color 0.3s;
`;

export const PostImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

export const PostInfo = styled.div`
  padding: 15px;
  background-color: white;
`;

export const ProfileDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileName = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

export const ProfileDetail = styled.div`
  font-size: 12px;
  color: #666;
`;
