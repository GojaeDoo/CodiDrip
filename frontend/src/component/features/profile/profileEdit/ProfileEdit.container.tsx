"use client";

import { useState } from "react";
import ProfileEditPresenter from "./ProfileEdit.presenter";

export const ProfileEditContainer = () => {
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [gender, setGender] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const heightOptions = Array.from({ length: 61 }, (_, i) => 140 + i); // 140~200
  const weightOptions = Array.from({ length: 121 }, (_, i) => 30 + i); // 30~150

  const onChangeHeight = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHeight(event.target.value);
  };

  const onChangeWeight = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWeight(event.target.value);
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
      setProfileImage(file); // 파일 자체를 저장하려면 이렇게!
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onClickCreateProfile = () => {
    if (height && weight && gender && nickname && profileImage) {
      console.log("프로필 생성");
      console.log("키 : ", height);
      console.log("몸무게 : ", weight);
      console.log("성별 : ", gender);
      console.log("닉네임 : ", nickname);
      console.log("프로필 이미지 : ", profileImage);
    } else {
      alert("모든 항목을 입력해주세요.");
      console.log("키 : ", height);
      console.log("몸무게 : ", weight);
      console.log("성별 : ", gender);
      console.log("닉네임 : ", nickname);
      console.log("프로필 이미지 : ", profileImage);
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
