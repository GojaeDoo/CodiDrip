"use client";

import React from "react";
import DripPostPresenter from "./DripPost.presenter";
import { DripPostPresenterProps } from "./DripPost.types";

const DEFAULT_PROFILE = {
  imageUrl: "https://via.placeholder.com/300x400",
  name: "홍길동",
  height: 180,
  weight: 70,
};

const DripPostContainer = () => {
  const presenterProps: DripPostPresenterProps = {
    imageUrl: DEFAULT_PROFILE.imageUrl,
    name: DEFAULT_PROFILE.name,
    height: DEFAULT_PROFILE.height,
    weight: DEFAULT_PROFILE.weight,
  };

  return <DripPostPresenter {...presenterProps} />;
};

export default DripPostContainer;
