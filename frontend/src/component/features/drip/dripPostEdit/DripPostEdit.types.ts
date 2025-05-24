import { RefObject, ChangeEvent, FormEvent } from "react";

export interface PostDripData {
  images: string[];
  tags: string[];
  userId: string;
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
  onDeleteImage: (index: number) => void;
  tags: string[];
  tagInput: string;
  onTagInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteTag: (index: number) => void;
  onSubmit: (e: FormEvent) => void;
  onUpdate: (e: FormEvent) => void;
  postNo?: number;
  status?: boolean;
  editData?: EditData;
  imageRef: RefObject<HTMLImageElement>;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  aspectRatio: string;
  onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}
