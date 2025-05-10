"use client";

import { useState, useRef, useEffect } from "react";
import DripPostEditPresenter from "./DripPostEdit.presenter";
import { DripPostEditPresenterProps } from "./DripPostEdit.types";
import { fetchDripPostQuery, postDrip, updateDrip } from "./DripPostEdit.query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const DripPostEditContainer = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editData, setEditData] = useState<{
    post_image: string[];
    post_tag: string[];
  } | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const postNo = searchParams.get("postNo");
  const statusParam = searchParams.get("status");
  const status: boolean | null =
    statusParam === "true" ? true : statusParam === "false" ? false : null;

  useEffect(() => {
    const fetchDripPost = async () => {
      if (status && postNo) {
        try {
          const response = await fetchDripPostQuery(postNo);
          if (response) {
            const parsedImages = JSON.parse(response.게시글이미지);
            const parsedTags = JSON.parse(response.태그);

            setEditData({
              post_image: parsedImages,
              post_tag: parsedTags,
            });
            setImages(parsedImages);
            setTags(parsedTags);
          }
        } catch (error) {
          console.error("Error fetching drip post:", error);
        }
      }
    };

    fetchDripPost();
  }, [status, postNo]);

  const handleImageUpload: DripPostEditPresenterProps["onImageUpload"] = async (
    e
  ) => {
    const files = e.target.files;
    if (files) {
      try {
        const newImages = await Promise.all(
          Array.from(files).map((file) => {
            return new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                if (typeof reader.result === "string") {
                  resolve(reader.result);
                } else {
                  reject(new Error("이미지 변환에 실패했습니다."));
                }
              };
              reader.onerror = () =>
                reject(new Error("이미지 읽기에 실패했습니다."));
              reader.readAsDataURL(file);
            });
          })
        );

        setImages((prev) => {
          const updatedImages = [...prev, ...newImages];
          // 현재 이미지 인덱스가 유효한 범위 내에 있는지 확인
          if (currentImageIndex >= updatedImages.length) {
            setCurrentImageIndex(updatedImages.length - 1);
          }
          return updatedImages;
        });
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  const handlePrevImage = () => {
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleDeleteImage = (idx: number) => {
    setImages((prev) => {
      const newArr = prev.filter((_, i) => i !== idx);
      // 삭제 후 currentImageIndex가 범위를 벗어나면 조정
      if (currentImageIndex >= newArr.length) {
        setCurrentImageIndex(Math.max(0, newArr.length - 1));
      }
      return newArr;
    });
  };

  const handleDeleteTag = (idx: number) => {
    setTags((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSelectImage = (idx: number) => {
    setCurrentImageIndex(idx);
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("로그인이 필요합니다.");
      }

      const trimmedInput = tagInput.trim();
      let finalTags = [...tags];

      if (trimmedInput) {
        const newTags = trimmedInput
          .split(/#/)
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
          .map((tag) => `#${tag}`);

        finalTags = [...new Set([...finalTags, ...newTags])];
      }

      if (finalTags.length === 0) {
        throw new Error("최소 하나의 태그를 입력해주세요.");
      }

      const postData = {
        images,
        tags: finalTags,
        userId,
      };

      await postDrip(postData);
      router.push("/myPage");
    } catch (error) {
      console.error("Error submitting drip:", error);
      alert(
        error instanceof Error
          ? error.message
          : "게시글 작성 중 오류가 발생했습니다."
      );
    }
  };

  const handleUpdate = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("로그인이 필요합니다.");
      }

      const trimmedInput = tagInput.trim();
      let finalTags = [...tags];

      if (trimmedInput) {
        const newTags = trimmedInput
          .split(/#/)
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
          .map((tag) => `#${tag}`);

        finalTags = [...new Set([...finalTags, ...newTags])];
      }

      if (finalTags.length === 0) {
        throw new Error("최소 하나의 태그를 입력해주세요.");
      }

      const postData = {
        postNo,
        images,
        tags: finalTags,
        userId,
      };

      await updateDrip(postData);
      router.push("/myPage");
    } catch (error) {
      console.error("Error updating drip:", error);
      alert(
        error instanceof Error
          ? error.message
          : "게시글 수정 중 오류가 발생했습니다."
      );
    }
  };

  // 이미지 src 처리 함수 (Presenter에서 옮김)
  const getImageSrc = (img: string) => {
    if (!img) return "";
    if (typeof img === "string" && img.startsWith("[") && img.endsWith("]")) {
      try {
        const arr = JSON.parse(img);
        if (Array.isArray(arr) && arr.length > 0) return getImageSrc(arr[0]);
      } catch {
        // 에러 무시
      }
      return "";
    }
    if (img.startsWith("dripdata:")) return img.replace("dripdata:", "data:");
    if (img.startsWith("data:image")) return img;
    if (img.startsWith("/uploads/drip/")) return `http://localhost:3005${img}`;
    if (img.startsWith("/")) return `http://localhost:3005/uploads/drip${img}`;
    return `http://localhost:3005/uploads/drip/${img.trim()}`;
  };

  // imageSrcList 생성
  const imageSrcList = images.map(getImageSrc);

  return (
    <DripPostEditPresenter
      images={images}
      imageSrcList={imageSrcList}
      currentImageIndex={currentImageIndex}
      fileInputRef={fileInputRef}
      onImageUpload={handleImageUpload}
      onPrevImage={handlePrevImage}
      onNextImage={handleNextImage}
      onSelectImage={handleSelectImage}
      onDeleteImage={handleDeleteImage}
      tags={tags}
      tagInput={tagInput}
      onTagInputChange={handleTagInputChange}
      onDeleteTag={handleDeleteTag}
      onSubmit={handleSubmit}
      onUpdate={handleUpdate}
      postNo={postNo}
      status={status}
      editData={editData}
    />
  );
};

export default DripPostEditContainer;
