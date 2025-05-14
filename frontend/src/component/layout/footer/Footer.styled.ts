import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: #1a1a1a;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem;
    gap: 2rem;
  }
`;

export const FooterContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

export const FooterInnerLeft = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);

  @media (min-width: 768px) {
    font-size: 0.9rem;
    gap: 0.75rem;
  }
`;

export const FooterContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;

  @media (min-width: 768px) {
    border-top: none;
    padding-top: 0;
    align-items: flex-end;
  }
`;

export const FooterInterRight = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

export const FooterText = styled.span`
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
`;

export const FooterBrand = styled.span`
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const FooterBigText = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: white;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;
