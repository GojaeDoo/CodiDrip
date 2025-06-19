export interface SearchResult {
  type: 'profile' | 'post';
  id: number;
  name: string;
  image: string;
  user_id: string;
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchResults: SearchResult[];
}

export interface SearchModalPresenterProps {
  isOpen: boolean;
  profileResults: SearchResult[];
  postResults: SearchResult[];
  onResultClick: (result: SearchResult) => void;
  onOverlayClick: (e: React.MouseEvent) => void;
  onClose: () => void;
  getImageUrl: (imagePath: string, type: 'profile' | 'post') => string;
} 