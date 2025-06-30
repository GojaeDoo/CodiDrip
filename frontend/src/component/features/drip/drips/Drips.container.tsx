"use client";
import React, { useState } from "react";
import DripsPresenter from "./Drips.presenter";
import { useSearchParams, useRouter } from "next/navigation";

export const DripsContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isDripUser = searchParams.get("dripUser") === "true";
  const genderSelect = searchParams.get("gender") || "all";
  
  // 스타일 필터 상태
  const [showStyleFilter, setShowStyleFilter] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const onClickSelectAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("gender", "all");
    router.push(`?${params.toString()}`);
  };

  const onClickSelectMen = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("gender", "male");
    router.push(`?${params.toString()}`);
  };

  const onClickSelectWomen = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("gender", "female");
    router.push(`?${params.toString()}`);
  };

  const onClickSelectStyleCategory = () => {
    setShowStyleFilter(!showStyleFilter);
  };

  const onStyleChange = (style: string) => {
    setSelectedStyles(prev => {
      if (prev.includes(style)) {
        return prev.filter(s => s !== style);
      } else {
        return [...prev, style];
      }
    });
  };

  const onCloseStyleFilter = () => {
    setShowStyleFilter(false);
  };

  return (
    <DripsPresenter
      genderSelect={genderSelect}
      onClickSelectAll={onClickSelectAll}
      onClickSelectMen={onClickSelectMen}
      onClickSelectWomen={onClickSelectWomen}
      onClickSelectStyleCategory={onClickSelectStyleCategory}
      isDripUser={isDripUser}
      showStyleFilter={showStyleFilter}
      selectedStyles={selectedStyles}
      onStyleChange={onStyleChange}
      onCloseStyleFilter={onCloseStyleFilter}
    />
  );
};

export default DripsContainer;
