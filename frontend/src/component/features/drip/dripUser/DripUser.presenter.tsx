import * as S from "./DripUser.styled";
import { DripUserPresenterProps } from "./DripUser.types";

export const DripUserPresenter = (props: DripUserPresenterProps) => {
  return (
    <S.Background>
      <S.UserDripWrapper>
        {props.users.map((user) => (
          <S.UserCard 
            key={user.profile_id}
            onClick={() => props.onUserCardClick(user.user_id)}
          >
            <S.ProfileImageWrapper>
              <S.ProfileImage
                src={`https://codidrip-backend.onrender.com/uploads/profiles/${user.profile_image}`}
                alt={user.profile_nickname}
              />
            </S.ProfileImageWrapper>
            <S.UserInfo>
              <S.Nickname>{user.profile_nickname}</S.Nickname>
              <S.UserStats>
                {user.profile_height}cm / {user.profile_weight}kg
              </S.UserStats>
            </S.UserInfo>
          </S.UserCard>
        ))}
      </S.UserDripWrapper>
    </S.Background>
  );
};

export default DripUserPresenter;
