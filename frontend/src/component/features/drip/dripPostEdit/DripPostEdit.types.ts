import { RefObject, ChangeEvent } from "react";

export interface PostDripData {
  images: string[];
  tags: string[];
  userId: string;
}

export interface DripPostEditPresenterProps {
  images: string[];
  imageSrcList: string[];
  currentImageIndex: number;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onSelectImage: (idx: number) => void;
  onDeleteImage: (idx: number) => void;
  tags: string[];
  tagInput: string;
  onTagInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteTag: (idx: number) => void;
  onSubmit: () => void;
  onUpdate: () => void;
  postNo: string | null;
  status: boolean | null;
  editData: {
    post_image: string[];
    post_tag: string[];
  } | null;
}
