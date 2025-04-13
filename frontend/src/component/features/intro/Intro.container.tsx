"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import IntroPresenter from "./Intro.presenter";
import { useAuth } from "@/context/AuthContext";

const IntroContainer = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/drips");
    }
  }, [isLoggedIn, router]);

  const onClickMoveLogin = () => {
    router.push("/login");
  };

  const onClickMoveDrips = () => {
    router.push("/drips");
  };

  const brandName = "DripDrop";
  const scatterDirections = brandName.split("").map(() => ({
    tx: `${Math.random() * 200 - 100}px`,
    ty: `${Math.random() * 200 - 100}px`,
  }));

  return (
    <IntroPresenter
      onClickMoveLogin={onClickMoveLogin}
      onClickMoveDrips={onClickMoveDrips}
      brandName={brandName}
      scatterDirections={scatterDirections}
    />
  );
};

export default IntroContainer;
