"use client";
import DripsPresenter from "./Drips.presenter";
import { DripsProps } from "./Drips.types";
const DripsContainer = () => {
  const onClickSelectAll: DripsProps["onClickSelectAll"] = () => {
    console.log("전체 선택");
  };

  const onClickSelectMen: DripsProps["onClickSelectMen"] = () => {
    console.log("남자 선택");
  };

  const onClickSelectWomen: DripsProps["onClickSelectWomen"] = () => {
    console.log("여자 선택");
  };

  return (
    <DripsPresenter
      onClickSelectAll={onClickSelectAll}
      onClickSelectMen={onClickSelectMen}
      onClickSelectWomen={onClickSelectWomen}
    />
  );
};

export default DripsContainer;
