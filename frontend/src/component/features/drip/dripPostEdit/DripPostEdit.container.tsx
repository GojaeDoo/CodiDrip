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
  const [imgInfo, setImgInfo] = useState({
    width: 1,
    height: 1,
    left: 0,
    top: 0,
  });
  const wrapperRef = useRef<HTMLDivElement>(null!);

  const searchParams = useSearchParams();

  const postNo = searchParams.get("postNo");
  const statusParam = searchParams.get("status");
  const status: boolean | null =
    statusParam === "true" ? true : statusParam === "false" ? false : null;

  // 이미지 경로 변환 함수 최종 정리
  const getImageUrl = (img: string) => {
    if (!img || img === "undefined" || img === "null") return "";
    if (img.startsWith("http") || img.startsWith("data:")) return img;
    // 파일명만 추출 (앞에 /가 있든 없든 무조건 제거)
    const fileName = img.replace(/^\\|\//, "");
    return `http://localhost:3005/uploads/drip/${fileName}`;
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
            // 이미지 URL 변환 적용 (빈 값, undefined, null 방어)
            const imageUrls = parsedImages
              .filter((img) => !!img && img !== "undefined" && img !== "null")
              .map(getImageUrl);
            setImages(imageUrls);
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

    const promises = Array.from(files).map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            resolve(e.target.result as string);
          } else {
            reject(new Error("Failed to read file"));
          }
        };
        reader.onerror = () => {
          reject(new Error("Failed to read file"));
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((newImages) => {
        console.log("Uploaded images:", newImages); // 디버깅용 로그
        // 기존 이미지와 새로 추가된 이미지를 합치되, 기존 이미지를 먼저 유지
        setImages((prev) => {
          const existingImages = prev.filter((img) =>
            img.startsWith("http://localhost:3005")
          );
          return [...existingImages, ...newImages];
        });
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
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
        // 수정 시 기존 이미지와 새로 추가된 이미지를 구분하여 처리
        const processedImages = images.map((img) => {
          // 이미 URL 형식인 경우 (기존 이미지)
          if (img.startsWith("http://localhost:3005")) {
            // URL에서 파일명만 추출하고 앞에 / 추가
            const fileName = img.split("/").pop() || "";
            return `/${fileName}`;
          }
          // base64 형식인 경우 (새로 추가된 이미지)
          return img;
        });

        await updateDrip({
          postNo,
          images: processedImages,
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

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (currentImageIndex >= images.length - 1) {
      setCurrentImageIndex(Math.max(0, images.length - 2));
    }
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
      onDeleteImage={handleDeleteImage}
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
