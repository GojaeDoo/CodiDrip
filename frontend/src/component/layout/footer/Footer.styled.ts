import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: var(--card-bg);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: background-color 0.3s ease;

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
  color: var(--text-muted);
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: 0.9rem;
    gap: 0.75rem;
  }
`;

export const FooterContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid var(--card-border);
  padding-top: 1.5rem;
  transition: border-color 0.3s ease;

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
  color: var(--text-muted);
  white-space: nowrap;
  transition: color 0.3s ease;
`;

export const FooterBrand = styled.span`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.1rem;
  white-space: nowrap;
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const FooterBigText = styled.span`
  color: var(--text-muted);
  font-size: 0.9rem;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-primary);
  }

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;
