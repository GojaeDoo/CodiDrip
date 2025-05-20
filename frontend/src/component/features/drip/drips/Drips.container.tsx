"use client";
import React from "react";
import DripsPresenter from "./Drips.presenter";
import { useSearchParams, useRouter } from "next/navigation";

export const DripsContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isDripUser = searchParams.get("dripUser") === "true";
  const genderSelect = searchParams.get("gender") || "all";

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

  return (
    <DripsPresenter
      genderSelect={genderSelect}
      onClickSelectAll={onClickSelectAll}
      onClickSelectMen={onClickSelectMen}
      onClickSelectWomen={onClickSelectWomen}
      isDripUser={isDripUser}
    />
  );
};

export default DripsContainer;
