"use client";

import { useEffect, useState } from "react";
import ProfileEditPresenter from "./ProfileEdit.presenter";
import { ProfileCreate } from "./profileEdit.query";
import { useRouter } from "next/navigation";
import axios from "axios";

export const ProfileEditContainer = () => {
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [gender, setGender] = useState("");
  const [nickname, setNickname] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null
  );

  const router = useRouter();

  const heightOptions = Array.from({ length: 61 }, (_, i) => 140 + i); // 140~200
  const weightOptions = Array.from({ length: 121 }, (_, i) => 30 + i); // 30~150

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("userId가 없습니다. 로그인이 필요합니다.");
      router.push("/login");
    }
  }, [router]);

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

  const onChangeProfileImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // 이미지 크기 제한
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 크기는 5MB 이하여야 합니다.");
        return;
      }

      try {
        // FormData 생성
        const formData = new FormData();
        formData.append("profileImage", file);

        // 이미지 업로드 API 호출
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
    try {
      if (!userId) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      console.log("프로필 생성 시도:", {
        height,
        weight,
        gender,
        nickname,
        uploadedImagePath,
        userId,
      });

      if (!uploadedImagePath) {
        alert("프로필 이미지를 업로드해주세요.");
        return;
      }

      if (height && weight && gender && nickname) {
        const response = await ProfileCreate({
          userId,
          height: Number(height),
          weight: Number(weight),
          gender,
          nickname,
          profileImage: uploadedImagePath,
        });
        console.log("프로필 생성 응답:", response);
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
