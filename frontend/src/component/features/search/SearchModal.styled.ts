import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 80px;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: var(--card-bg);
  border-radius: 16px;
  width: 95%;
  max-width: 800px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid var(--card-border);
  background: var(--card-bg);
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  transition: color 0.3s ease;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--card-border);
    color: var(--text-primary);
  }
`;

export const ResultsContainer = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  padding: 0;
  background: var(--card-bg);
  transition: background-color 0.3s ease;
`;

export const ResultItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);

  &:hover {
    background-color: var(--card-border);
    border-color: var(--accent);
    transform: translateY(-2px);
  }
`;

export const ResultImage = styled.div`
  margin-bottom: 12px;
  flex-shrink: 0;
`;

export const ResultInfo = styled.div`
  flex: 1;
  min-width: 0;
  text-align: center;
`;

export const ResultName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  transition: color 0.3s ease;
`;

export const ResultType = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  background-color: var(--card-border);
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-block;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

export const NoResults = styled.div`
  padding: 60px 32px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 16px;
  transition: color 0.3s ease;
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  padding: 24px 32px;
  background: var(--card-bg);
  transition: background-color 0.3s ease;
`;

export const ProfileSection = styled.div`
  margin-bottom: 32px;
`;

export const PostSection = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h3`
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  padding: 0 32px;
  padding-top: 24px;
  transition: color 0.3s ease;
`; 