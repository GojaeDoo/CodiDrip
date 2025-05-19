"use client";
import React, { useState } from "react";
import DripsPresenter from "./Drips.presenter";
import { useSearchParams } from "next/navigation";

export const DripsContainer = () => {
  const [genderSelect, setGenderSelect] = useState<string>("all");
  const searchParams = useSearchParams();
  const isDripUser = searchParams.get("dripUser") === "true";

  const onClickSelectAll = () => {
    setGenderSelect("all");
  };

  const onClickSelectMen = () => {
    setGenderSelect("male");
  };

  const onClickSelectWomen = () => {
    setGenderSelect("female");
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
