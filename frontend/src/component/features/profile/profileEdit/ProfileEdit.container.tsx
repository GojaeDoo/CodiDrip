"use client";

import { useEffect, useState } from "react";
import ProfileEditPresenter from "./ProfileEdit.presenter";
import {
  ProfileCreate,
  getProfileQuery,
  ProfileUpdate,
} from "./profileEdit.query";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export const ProfileEditContainer = () => {
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [gender, setGender] = useState("");
  const [nickname, setNickname] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [profileAbout, setProfileAbout] = useState("");
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const searchParams = useSearchParams();
  const Status = searchParams.get("Status");
  const router = useRouter();

  const heightOptions = Array.from({ length: 61 }, (_, i) => 140 + i); // 140~200
  const weightOptions = Array.from({ length: 121 }, (_, i) => 30 + i); // 30~150

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      // Status가 true면 수정 모드
      if (Status === "true") {
        setIsEditMode(true);
        // 기존 프로필 정보 불러오기
        fetchProfile(storedUserId);
      }
    } else {
      console.error("userId가 없습니다. 로그인이 필요합니다.");
      router.push("/login");
    }
  }, [Status, router]);

  const fetchProfile = async (userId: string) => {
    try {
      const response = await getProfileQuery(userId);
      console.log("컨테이너에서 받은 프로필 데이터:", response);
      if (response) {
        setHeight(response.profile_height);
        setWeight(response.profile_weight);
        setGender(response.profile_gender?.toLowerCase() || ""); // 성별 값을 소문자로 변환
        setNickname(response.profile_nickname);
        setProfileAbout(response.profile_about);
        if (response.profile_image) {
          const imageUrl = `http://localhost:3005/uploads/profiles/${response.profile_image}`;
          console.log("이미지 URL:", imageUrl);
          setPreviewUrl(imageUrl);
          setUploadedImagePath(response.profile_image);
        } else {
          console.log("프로필 이미지가 없습니다.");
        }
      }
    } catch (error) {
      console.error("프로필 정보 불러오기 실패:", error);
    }
  };

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

  const onChangeProfileAbout = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfileAbout(event.target.value);
  };

  const onChangeProfileImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 크기는 5MB 이하여야 합니다.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("profileImage", file);

        const response = await axios.post(
          "http://localhost:3005/api/profiles/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.imagePath) {
          setUploadedImagePath(response.data.imagePath);
          setPreviewUrl(URL.createObjectURL(file));
          console.log("이미지 업로드 성공:", response.data.imagePath);
        }
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  const onClickCreateProfile = async () => {
    if (!userId) {
      console.error("userId가 없습니다.");
      return;
    }

    if (!height || !weight || !gender || !nickname || !profileAbout) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const profileData = {
        userId,
        height,
        weight,
        gender,
        nickname,
        profileAbout,
        profileImage: uploadedImagePath || previewUrl || "",
      };

      if (isEditMode) {
        await ProfileUpdate(profileData);
        alert("프로필이 수정되었습니다.");
      } else {
        await ProfileCreate(profileData);
        alert("프로필이 생성되었습니다.");
      }
      router.push("/myPage");
    } catch (error) {
      console.error("프로필 저장 중 오류 발생:", error);
      alert("프로필 저장 중 오류가 발생했습니다.");
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
        onChangeProfileAbout={onChangeProfileAbout}
        previewUrl={previewUrl}
        isEditMode={isEditMode}
        height={height}
        weight={weight}
        nickname={nickname}
        profileAbout={profileAbout}
      />
    </>
  );
};

export default ProfileEditContainer;
