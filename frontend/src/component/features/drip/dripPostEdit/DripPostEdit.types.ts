import { RefObject, ChangeEvent } from "react";

export interface PostDripData {
  images: string[];
  tags: string[];
  userId: string;
}

export interface DripPostEditPresenterProps {
  images: string[];
  currentImageIndex: number;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  tags: string[];
  tagInput: string;
  onTagInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  postNo: string | null;
  status: boolean | null;
}
