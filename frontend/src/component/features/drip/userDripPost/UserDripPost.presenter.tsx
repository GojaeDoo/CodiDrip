import * as S from "./UserDripPost.styled";
import { UserDripPostProps } from "./UserDripPost.types";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
} from "lucide-react";

export const UserDripPostPresenter = ({
  dripPostData,
  currentImageIndexes,
  onPrevImage,
  onNextImage,
}: UserDripPostProps) => {
  return (
    <>
      <S.Background>
        <S.UserDripPostWrapper>
          {dripPostData?.map((post) => {
            const images = JSON.parse(post.post_image);
            const currentIndex = currentImageIndexes[post.id] || 0;
            const tags = JSON.parse(post.post_tag);

            return (
              <S.PostCard key={`post-${post.id}`}>
                <S.PostHeader>
                  <S.UserProfile>
                    <S.ProfileImage
                      src={`http://localhost:3005/uploads/profiles/default-profile.png`}
                      alt="profile"
                    />
                    <S.Username>{post.user_id}</S.Username>
                  </S.UserProfile>
                </S.PostHeader>

                <S.ImageContainer>
                  <S.PostImage
                    src={`http://localhost:3005/uploads/drip${images[currentIndex]}`}
                    alt="drip post"
                  />
                  {images.length > 1 && (
                    <>
                      <S.NavigationButton
                        onClick={() => onPrevImage(post.id, images.length)}
                        position="left"
                      >
                        <ChevronLeft size={20} />
                      </S.NavigationButton>
                      <S.NavigationButton
                        onClick={() => onNextImage(post.id, images.length)}
                        position="right"
                      >
                        <ChevronRight size={20} />
                      </S.NavigationButton>
                      <S.ImageCounter>
                        {currentIndex + 1} / {images.length}
                      </S.ImageCounter>
                    </>
                  )}
                </S.ImageContainer>

                <S.PostActions>
                  <S.ActionButton>
                    <Heart size={24} />
                  </S.ActionButton>
                  <S.ActionButton>
                    <MessageCircle size={24} />
                  </S.ActionButton>
                  <S.ActionButton>
                    <Share2 size={24} />
                  </S.ActionButton>
                  <div style={{ flex: 1 }} />
                  <S.ActionButton>
                    <Bookmark size={24} />
                  </S.ActionButton>
                </S.PostActions>

                <S.PostInfo>
                  <S.PostTags>
                    {tags.map((tag: string, index: number) => (
                      <S.Tag key={`tag-${post.id}-${index}`}>#{tag}</S.Tag>
                    ))}
                  </S.PostTags>
                </S.PostInfo>
              </S.PostCard>
            );
          })}
        </S.UserDripPostWrapper>
      </S.Background>
    </>
  );
};

export default UserDripPostPresenter;
