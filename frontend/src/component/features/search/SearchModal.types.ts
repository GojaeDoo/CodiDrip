export interface SearchResultProps {
  type: 'profile' | 'post';
  id: number;
  name: string;
  image: string;
  user_id: string;
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchResults: SearchResultProps[];
}

export interface SearchModalPresenterProps {
  isOpen: boolean;
  profileResults: SearchResultProps[];
  postResults: SearchResultProps[];
  onResultClick: (result: SearchResultProps) => void;
  onOverlayClick: (e: React.MouseEvent) => void;
  onClose: () => void;
  getImageUrl: (imagePath: string, type: 'profile' | 'post') => string;
} 