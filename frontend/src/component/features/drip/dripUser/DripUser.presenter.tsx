import * as S from "./DripUser.styled";

export const DripUserPresenter = () => {
  // 임시 데이터
  const users = [
    {
      id: 1,
      nickname: "스타일리시한 남자",
      profileImage: "/default-profile.png",
      height: 180,
      weight: 75,
    },
    {
      id: 2,
      nickname: "패션 여왕",
      profileImage: "/default-profile.png",
      height: 165,
      weight: 50,
    },
  ];

  return (
    <S.Background>
      <S.UserDripWrapper>
        {users.map((user) => (
          <S.UserCard key={user.id}>
            <S.ProfileImageWrapper>
              <S.ProfileImage
                src={`http://localhost:3005/uploads/profiles/${user.profileImage}`}
                alt={user.nickname}
              />
            </S.ProfileImageWrapper>
            <S.UserInfo>
              <S.Nickname>{user.nickname}</S.Nickname>
              <S.UserStats>
                {user.height}cm / {user.weight}kg
              </S.UserStats>
            </S.UserInfo>
          </S.UserCard>
        ))}
      </S.UserDripWrapper>
    </S.Background>
  );
};

export default DripUserPresenter;
