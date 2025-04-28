import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileEditPresenter from "./ProfileEdit.presenter";
import { getProfile, updateProfile } from "./ProfileEdit.query";
import { Profile } from "../../../types/profileTypes";

const ProfileEditContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (id) {
          const data = await getProfile(id);
          if (data) {
            setProfile(data);
            setHeight(data.height);
            setWeight(data.weight);
            setGender(data.gender);
            setNickname(data.nickname);
            setProfileImage(data.profile_image || "");
          }
        }
      } catch (error) {
        console.error("프로필을 불러오는 중 오류가 발생했습니다:", error);
        setError("프로필을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchProfile();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      // 서버로 파일 전송
      fetch("http://localhost:3000/api/profiles/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setProfileImage(data.imagePath);
        })
        .catch((error) => {
          console.error("이미지 업로드 중 오류가 발생했습니다:", error);
          setError("이미지 업로드 중 오류가 발생했습니다.");
        });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        const updatedProfile = await updateProfile(id, {
          height,
          weight,
          gender,
          nickname,
          profile_image: profileImage,
        });
        if (updatedProfile) {
          navigate(`/profile/${id}`);
        }
      }
    } catch (error) {
      console.error("프로필을 수정하는 중 오류가 발생했습니다:", error);
      setError("프로필을 수정하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <ProfileEditPresenter
      profile={profile}
      height={height}
      weight={weight}
      gender={gender}
      nickname={nickname}
      profileImage={profileImage}
      error={error}
      onHeightChange={(e) => setHeight(Number(e.target.value))}
      onWeightChange={(e) => setWeight(Number(e.target.value))}
      onGenderChange={(e) => setGender(e.target.value)}
      onNicknameChange={(e) => setNickname(e.target.value)}
      onImageChange={handleImageChange}
      onSubmit={handleSubmit}
    />
  );
};

export default ProfileEditContainer;
