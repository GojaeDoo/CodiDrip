"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DripPostEditPresenter from "./DripPostEdit.presenter";
import { fetchDripPostQuery, postDrip, updateDrip } from "./DripPostEdit.query";

export const DripPostEditContainer = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [editData, setEditData] = useState<{
    post_image: string[];
    post_tag: string[];
  } | null>(null);
  const imageRef = useRef<HTMLImageElement>(null!);
  const [aspectRatio, setAspectRatio] = useState("3 / 4");
  const [imgInfo, setImgInfo] = useState({ width: 1, height: 1, left: 0, top: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null!);

  const searchParams = useSearchParams();

  const postNo = searchParams.get("postNo");
  const statusParam = searchParams.get("status");
  const status: boolean | null =
    statusParam === "true" ? true : statusParam === "false" ? false : null;

  // 이미지 경로 변환 함수 추가
  const getImageUrl = (img: string) => {
    if (img.startsWith("http") || img.startsWith("data:")) return img;
    return `http://localhost:3005/uploads/drip/${img.replace(/^\\|\//, "")}`;
  };

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
            setImages(parsedImages.map(getImageUrl));
            setTags(parsedTags);
          }
        } catch (error) {
          console.error("Error fetching drip post:", error);
        }
      }
    };

    fetchDripPost();
  }, [status, postNo]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push(e.target.result as string);
          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages]);
          }
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);

    // 엔터키나 쉼표로 태그 추가
    if (value.endsWith(",") || value.endsWith(" ")) {
      const newTag = value.slice(0, -1).trim();
      if (newTag && !tags.includes(newTag)) {
        setTags((prev) => [...prev, newTag]);
        setTagInput("");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedInput = tagInput.trim();
      if (trimmedInput && !tags.includes(trimmedInput)) {
        setTags((prev) => [...prev, trimmedInput]);
        setTagInput("");
      }
    }
  };

  const handleDeleteTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      if (status) {
        await updateDrip({
          postNo,
          images,
          tags,
          userId,
        });
      } else {
        await postDrip({
          images,
          tags,
          userId,
        });
      }
      router.push("/drips");
    } catch (error) {
      console.error("Error posting drip:", error);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => Math.min(images.length - 1, prev + 1));
  };

  // 이미지 렌더링 영역 계산 (Detail과 동일)
  const updateRect = useCallback(() => {
    if (imageRef.current) {
      const container = imageRef.current.parentElement?.getBoundingClientRect();
      const img = imageRef.current;
      if (!container) return;
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      const containerWidth = container.width;
      const containerHeight = container.height;
      const imgAspect = naturalWidth / naturalHeight;
      const containerAspect = containerWidth / containerHeight;
      let displayWidth = containerWidth;
      let displayHeight = containerHeight;
      let offsetLeft = 0;
      let offsetTop = 0;
      if (imgAspect > containerAspect) {
        displayWidth = containerWidth;
        displayHeight = containerWidth / imgAspect;
        offsetTop = (containerHeight - displayHeight) / 2;
      } else {
        displayHeight = containerHeight;
        displayWidth = containerHeight * imgAspect;
        offsetLeft = (containerWidth - displayWidth) / 2;
      }
      setImgInfo({
        width: displayWidth,
        height: displayHeight,
        left: offsetLeft,
        top: offsetTop,
      });
    }
  }, [imageRef]);

  useEffect(() => {
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [updateRect, currentImageIndex]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
    updateRect();
  };

  return (
    <DripPostEditPresenter
      containerRef={wrapperRef}
      images={images}
      imageSrcList={images}
      currentImageIndex={currentImageIndex}
      fileInputRef={fileInputRef}
      onImageUpload={handleImageUpload}
      onPrevImage={handlePrevImage}
      onNextImage={handleNextImage}
      onSelectImage={() => {}}
      onDeleteImage={() => {}}
      tags={tags}
      tagInput={tagInput}
      onTagInputChange={handleTagInputChange}
      onKeyPress={handleKeyPress}
      onDeleteTag={handleDeleteTag}
      onSubmit={handleSubmit}
      onUpdate={handleSubmit}
      postNo={postNo ? parseInt(postNo) : undefined}
      status={status ?? undefined}
      editData={editData ?? undefined}
      imageRef={imageRef}
      aspectRatio={aspectRatio}
      onImageLoad={handleImageLoad}
    />
  );
};

export default DripPostEditContainer;
