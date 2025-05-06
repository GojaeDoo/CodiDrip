import * as S from "./DripPost.styled";
import { DripPostProps } from "./DripPost.types";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
} from "lucide-react";

export const DripPostPresenter = (props: DripPostProps) => {
  return (
    <>
      <S.Background>
        <S.UserDripPostWrapper>
          {!props.dripPostData || props.dripPostData.length === 0 ? (
            <div>게시물이 없습니다.</div>
          ) : (
            props.dripPostData.map((post) => {
              const images = post.post_image || [];
              const tags = post.post_tag || [];
              const currentIndex = props.currentImageIndexes[post.post_no] || 0;

              if (images.length === 0) {
                return null;
              }

              return (
                <S.PostCard key={`post-${post.post_no}`}>
                  <S.PostHeader>
                    <S.UserProfile>
                      <S.ProfileImage
                        src={`http://localhost:3005/uploads/profiles/${post.profile_image}`}
                        alt="profile"
                      />
                      <S.Username>{post.profile_nickname}</S.Username>
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
                          onClick={() =>
                            props.onPrevImage(post.post_no, images.length)
                          }
                          $position="left"
                        >
                          <ChevronLeft size={20} />
                        </S.NavigationButton>
                        <S.NavigationButton
                          onClick={() =>
                            props.onNextImage(post.post_no, images.length)
                          }
                          $position="right"
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
                        <S.Tag key={`tag-${post.post_no}-${index}`}>
                          #{tag}
                        </S.Tag>
                      ))}
                    </S.PostTags>
                  </S.PostInfo>
                </S.PostCard>
              );
            })
          )}
        </S.UserDripPostWrapper>
      </S.Background>
    </>
  );
};

export default DripPostPresenter;
