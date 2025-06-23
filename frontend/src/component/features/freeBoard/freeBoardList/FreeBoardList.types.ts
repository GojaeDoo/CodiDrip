export interface FreeBoardPost {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  viewCount: number;
  content?: string;
}

export interface FreeBoardListProps {
  posts: FreeBoardPost[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  onClickSearch: () => void;
  onPageChange: (page: number) => void;
  onPostClick: (postId: number) => void;
  onWriteClick: () => void;
}

export interface FreeBoardListPresenterProps {
  posts: FreeBoardPost[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  onClickSearch: () => void;
  onPageChange: (page: number) => void;
  onPostClick: (postId: number) => void;
  onWriteClick: () => void;
  onSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  formatDate: (dateString: string) => string;
  renderPagination: () => React.ReactNode;
}
