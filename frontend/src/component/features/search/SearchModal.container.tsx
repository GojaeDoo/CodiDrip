import { SearchModalPresenter } from "./SearchModal.presenter";
import { SearchModalPresenterProps, SearchModalProps, SearchResultProps } from "./SearchModal.types";
import { useRouter } from "next/navigation";
import { encodeUserId } from "@/utils/urlEncoder";
import { getProfileImageUrl, getDripImageUrl } from "@/utils/imageUtils";

export const SearchModalContainer = ({ 
  isOpen, 
  onClose, 
  searchResults 
}: SearchModalProps) => {
  const router = useRouter();

  const getImageUrl = (imagePath: string, type: 'profile' | 'post') => {
    if (!imagePath) {
      return "/images/profile/default-profile.png";
    }
    
    if (type === 'profile') {
      return getProfileImageUrl(imagePath) || "/images/profile/default-profile.png";
    } else {
      return getDripImageUrl(imagePath) || "/images/profile/default-profile.png";
    }
  };

  const onResultClick: SearchModalPresenterProps["onResultClick"] = (result: SearchResultProps) => {
    if (result.type === 'profile') {
      const encodedUserId = encodeUserId(result.user_id);
      router.push(`/myPage?status=true&uid=${encodedUserId}`);
    } else if (result.type === 'post') {
      router.push(`/dripPostDetail?postNo=${result.id}`);
    }
    onClose();
  };

  const onOverlayClick: SearchModalPresenterProps["onOverlayClick"] = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 검색 결과를 타입별로 분리
  const profileResults = searchResults.filter(result => result.type === 'profile');
  const postResults = searchResults.filter(result => result.type === 'post');

  return (
    <SearchModalPresenter
      isOpen={isOpen}
      profileResults={profileResults}
      postResults={postResults}
      onResultClick={onResultClick}
      onOverlayClick={onOverlayClick}
      onClose={onClose}
      getImageUrl={getImageUrl}
    />
  );
}; 