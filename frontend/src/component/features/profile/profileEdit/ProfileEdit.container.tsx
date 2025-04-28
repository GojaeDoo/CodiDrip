"use client";

import { useEffect, useState } from "react";
import ProfileEditPresenter from "./ProfileEdit.presenter";
import { ProfileCreate } from "./profileEdit.query";
import { useRouter } from "next/navigation";

export const ProfileEditContainer = () => {
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [gender, setGender] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();

  const heightOptions = Array.from({ length: 61 }, (_, i) => 140 + i); // 140~200
  const weightOptions = Array.from({ length: 121 }, (_, i) => 30 + i); // 30~150

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const onChangeHeight = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHeight(Number(event.target.value));
  };

  const onChangeWeight = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWeight(Number(event.target.value));
  };

  const onChangeGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const onChangeProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 이미지 크기 제한
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 크기는 5MB 이하여야 합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setPreviewUrl(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const onClickCreateProfile = async () => {
    try {
      if (height && weight && gender && nickname && profileImage && userId) {
        const response = await ProfileCreate({
          userId,
          height: Number(height),
          weight: Number(weight),
          gender,
          nickname,
          profileImage,
        });
        console.log(response);
        router.push("/drips");
      } else {
        alert("모든 항목을 입력해주세요.");
      }
    } catch (error) {
      console.error("프로필 생성 중 오류 발생:", error);
      alert("프로필 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <ProfileEditPresenter
        heightOptions={heightOptions}
        weightOptions={weightOptions}
        onChangeHeight={onChangeHeight}
        onChangeWeight={onChangeWeight}
        gender={gender}
        onChangeGender={onChangeGender}
        onChangeNickname={onChangeNickname}
        onChangeProfileImage={onChangeProfileImage}
        onClickCreateProfile={onClickCreateProfile}
        previewUrl={previewUrl}
      />
    </>
  );
};

export default ProfileEditContainer;
