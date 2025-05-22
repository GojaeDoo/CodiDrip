import React, { useState, useEffect } from "react";
import * as S from "./DripPostEdit.styled";

interface PinDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (description: string) => void;
  initialDescription?: string;
}

const PinDescriptionModal: React.FC<PinDescriptionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialDescription = "",
}) => {
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(description);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <S.ModalTitle>핀 설명</S.ModalTitle>
          <S.ModalInput
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="핀에 대한 설명을 입력하세요"
            autoFocus
          />
          <S.ModalButtonGroup>
            <S.ModalButton type="button" onClick={onClose}>
              취소
            </S.ModalButton>
            <S.ModalButton type="submit" $primary>
              저장
            </S.ModalButton>
          </S.ModalButtonGroup>
        </form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default PinDescriptionModal;
