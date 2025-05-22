import { RefObject, ChangeEvent, FormEvent } from "react";

export interface PostDripData {
  images: string[];
  tags: string[];
  userId: string;
  pins: Pin[];
}

export interface Pin {
  id: string;
  x: number;
  y: number;
  description: string;
}

export interface EditData {
  post_image: string[];
  post_tag: string[];
}

export interface DripPostEditPresenterProps {
  images: string[];
  imageSrcList: string[];
  currentImageIndex: number;
  fileInputRef: RefObject<HTMLInputElement>;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onSelectImage: (index: number) => void;
  onDeleteImage: () => void;
  tags: string[];
  tagInput: string;
  onTagInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteTag: (index: number) => void;
  onSubmit: (e: FormEvent) => void;
  onUpdate: (e: FormEvent) => void;
  postNo?: number;
  status?: boolean;
  editData?: EditData;
  pins: Pin[];
  onAddPin: (e: React.MouseEvent<HTMLImageElement>) => void;
  onUpdatePin: (pinId: string, description: string) => void;
  onDeletePin: (pinId: string) => void;
  isAddingPin: boolean;
  onTogglePinMode: () => void;
  isModalOpen: boolean;
  selectedPinId: string | null;
  onPinClick: (pinId: string) => void;
  onModalClose: () => void;
  onModalSubmit: (description: string) => void;
}
