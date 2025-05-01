"use client";
import React, { useState } from "react";
import DripsPresenter from "./Drips.presenter";
import DripPost from "../../../../app/dripPost/page";
import { DripsProps } from "./Drips.types";

const DripsContainer = () => {
  const [genderSelect, setGenderSelect] = useState<string>("all");

  const onClickSelectAll: DripsProps["onClickSelectAll"] = () => {
    console.log("전체 선택");
    setGenderSelect("all");
  };

  const onClickSelectMen: DripsProps["onClickSelectMen"] = () => {
    console.log("남자 선택");
    setGenderSelect("male");
  };

  const onClickSelectWomen: DripsProps["onClickSelectWomen"] = () => {
    console.log("여자 선택");
    setGenderSelect("female");
  };

  return (
    <DripsPresenter
      onClickSelectAll={onClickSelectAll}
      onClickSelectMen={onClickSelectMen}
      onClickSelectWomen={onClickSelectWomen}
      genderSelect={genderSelect}
    />
  );
};

export default DripsContainer;
