import styled from "styled-components";

export const Card = styled.div`
  width: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

export const Info = styled.div`
  padding: 20px;
`;

export const Name = styled.h2`
  margin: 0;
  font-size: 24px;
`;

export const Details = styled.div`
  margin-top: 10px;
`;

export const Detail = styled.p`
  margin: 5px 0;
  color: #666;
`;
