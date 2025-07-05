import * as S from "./Follow.styled";
import { FollowPresenterProps } from "./Follow.types";
import { getProfileImageUrl } from "@/utils/imageUtils";

export const FollowPresenter = (props: FollowPresenterProps) => {
    return (
        <S.Background>
            <S.FollowWrapper>
                {props.currentList && props.currentList.length > 0 ? (
                    <S.FollowList>
                        {props.currentList.map((user) => (
                                <S.FollowItem key={user.profile_id}>
                                    <S.FollowProfileImage
                                        src={getProfileImageUrl(user.profile_image) || undefined}
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
                            {props.listTitle}가 없습니다.
                        </S.EmptyMessage>
                    )}
            </S.FollowWrapper>
        </S.Background>
    );
};

export default FollowPresenter;