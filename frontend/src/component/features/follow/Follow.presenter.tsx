import * as S from "./Follow.styled";
import { FollowPresenterProps } from "./Follow.types";

export const FollowPresenter = (props: FollowPresenterProps) => {
    if (props.isLoading) {
        return (
            <S.Background>
                <S.FollowWrapper>
                    <S.LoadingMessage>로딩 중...</S.LoadingMessage>
                </S.FollowWrapper>
            </S.Background>
        );
    }

    const currentList = props.activeTab === 'followers' ? props.followers : props.following;
    const listTitle = props.activeTab === 'followers' ? '팔로워' : '팔로잉';

    return (
        <S.Background>
            <S.FollowWrapper>
                
                    {currentList && currentList.length > 0 ? (
                        <S.FollowList>
                            {currentList.map((user) => (
                                <S.FollowItem key={user.profile_id}>
                                    <S.FollowProfileImage
                                        src={`https://codidrip-backend.onrender.com/uploads/profiles/${user.profile_image}`}
                                        alt={user.profile_nickname}
                                    />
                                    <S.FollowInfo>
                                        <S.FollowName>{user.profile_nickname}</S.FollowName>
                                        <S.FollowDetail>
                                            {user.profile_height}cm • {user.profile_weight}kg
                                        </S.FollowDetail>
                                        {user.profile_about && (
                                            <S.FollowAbout>{user.profile_about}</S.FollowAbout>
                                        )}
                                    </S.FollowInfo>
                                </S.FollowItem>
                            ))}
                        </S.FollowList>
                    ) : (
                        <S.EmptyMessage>
                            {listTitle}가 없습니다.
                        </S.EmptyMessage>
                    )}
               
            </S.FollowWrapper>
        </S.Background>
    );
};

export default FollowPresenter;