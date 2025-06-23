export interface FreeBoardDetailPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  viewCount: number;
}

export interface FreeBoardDetailPresenterProps {
  post: FreeBoardDetailPost | null;
  loading: boolean;
  onBackToList: () => void;
  onEdit: () => void;
  onDelete: () => void;
  formatDate: (dateString: string) => string;
  isLogin: boolean;
}
