"use client";

import React from "react";
import { useRouter } from "next/navigation";
import IntroPresenter from "./Intro.presenter";

const IntroContainer = () => {
  const router = useRouter();

  const onClickLogin = () => {
    router.push("/login");
  };

  const onClickJoin = () => {
    router.push("/join");
  };

  const brandName = "DripDrop";
  const scatterDirections = [
    { tx: "-100px", ty: "-50px" },
    { tx: "100px", ty: "-30px" },
    { tx: "-80px", ty: "40px" },
    { tx: "70px", ty: "-20px" },
    { tx: "-60px", ty: "60px" },
    { tx: "90px", ty: "30px" },
    { tx: "-70px", ty: "-40px" },
    { tx: "80px", ty: "-60px" },
  ];

  return (
    <IntroPresenter
      onClickLogin={onClickLogin}
      onClickJoin={onClickJoin}
      brandName={brandName}
      scatterDirections={scatterDirections}
    />
  );
};

export default IntroContainer;
