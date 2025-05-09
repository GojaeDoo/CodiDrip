"use client";

import { useState, useRef, useEffect } from "react";
import DripPostEditPresenter from "./DripPostEdit.presenter";
import { DripPostEditPresenterProps } from "./DripPostEdit.types";
import { fetchDripPostQuery, postDrip } from "./DripPostEdit.query";
import { useSearchParams } from "next/navigation";

export const DripPostEditContainer = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();

  const postNo = searchParams.get("postNo");
  const statusParam = searchParams.get("status");
  const status: boolean | null =
    statusParam === "true" ? true : statusParam === "false" ? false : null;

  console.log("postNo : " + postNo);
  console.log("status : " + status);

  useEffect(() => {
    if (status && postNo) {
      const fetchDripPost = async () => {
        console.log("들어오지?");
        const response = await fetchDripPostQuery(postNo);
        console.log(response);
      };
      fetchDripPost();
    } else {
      console.log("게시");
      return;
    }
  }, [status, postNo]);

  const handleImageUpload: DripPostEditPresenterProps["onImageUpload"] = async (
    e
  ) => {
    const files = e.target.files;
    if (files) {
      const newImages = await Promise.all(
        Array.from(files).map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
          });
        })
      );
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handlePrevImage: DripPostEditPresenterProps["onPrevImage"] = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage: DripPostEditPresenterProps["onNextImage"] = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
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

      console.log("Final tags:", finalTags);

      if (finalTags.length === 0) {
        throw new Error("최소 하나의 태그를 입력해주세요.");
      }

      const postData = {
        images,
        tags: finalTags,
        userId,
      };

      console.log("Posting data:", postData);
      await postDrip(postData);

      setImages([]);
      setTags([]);
      setTagInput("");
    } catch (error) {
      console.error("Error submitting drip:", error);
      alert(
        error instanceof Error
          ? error.message
          : "게시글 작성 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <DripPostEditPresenter
      images={images}
      currentImageIndex={currentImageIndex}
      tags={tags}
      tagInput={tagInput}
      fileInputRef={fileInputRef}
      onImageUpload={handleImageUpload}
      onPrevImage={handlePrevImage}
      onNextImage={handleNextImage}
      onTagInputChange={handleTagInputChange}
      onSubmit={handleSubmit}
      postNo={postNo}
      status={status}
    />
  );
};

export default DripPostEditContainer;
