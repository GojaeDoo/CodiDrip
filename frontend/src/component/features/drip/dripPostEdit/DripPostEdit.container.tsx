"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DripPostEditPresenter from "./DripPostEdit.presenter";
import { Pin } from "./DripPostEdit.types";
import { fetchDripPostQuery, postDrip, updateDrip } from "./DripPostEdit.query";

export const DripPostEditContainer = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [pins, setPins] = useState<Pin[]>([]);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editData, setEditData] = useState<{
    post_image: string[];
    post_tag: string[];
  } | null>(null);

  const searchParams = useSearchParams();

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

  const handleAddPin = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isAddingPin) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newPin: Pin = {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
      description: "",
    };

    setPins((prev) => [...prev, newPin]);
    setSelectedPinId(newPin.id);
    setIsModalOpen(true);
    setIsAddingPin(false);
  };

  const handlePinClick = (pinId: string) => {
    setSelectedPinId(pinId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPinId(null);
  };

  const handleModalSubmit = (description: string) => {
    if (selectedPinId) {
      setPins((prev) =>
        prev.map((pin) =>
          pin.id === selectedPinId ? { ...pin, description } : pin
        )
      );
    }
    handleModalClose();
  };

  const handleTogglePinMode = () => {
    setIsAddingPin(!isAddingPin);
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
          pins,
        });
      } else {
        await postDrip({
          images,
          tags,
          userId,
          pins,
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

  return (
    <DripPostEditPresenter
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
      pins={pins}
      onAddPin={handleAddPin}
      onUpdatePin={() => {}}
      onDeletePin={() => {}}
      isAddingPin={isAddingPin}
      onTogglePinMode={handleTogglePinMode}
      isModalOpen={isModalOpen}
      selectedPinId={selectedPinId}
      onPinClick={handlePinClick}
      onModalClose={handleModalClose}
      onModalSubmit={handleModalSubmit}
    />
  );
};

export default DripPostEditContainer;
