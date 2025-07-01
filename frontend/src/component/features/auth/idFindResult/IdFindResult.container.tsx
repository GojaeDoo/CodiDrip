"use client";

import { useRouter, useSearchParams } from "next/navigation";
import IdFindResultPresenter from "./IdFindResult.presenter";
import { IdFindResultPresenterProps } from "./IdFindResult.types";
import { useEffect, useState } from "react";

export const IdFindResultContainer = () => {
  const [imageName, setImageName] = useState<string | null>(null);
  const [text, setText] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const result = searchParams.get("result") ?? "";

  useEffect(() => {
    if (result === "true") {
      setImageName("/images/idFind/IdFindSuccess-image.png");
      setText("입력하신 정보와 일치하는 아이디입니다.");
    } else {
      setImageName("/images/idFind/IdFindFail-image.png");
      setText("입력하신 정보와 일치하는 아이디가 없습니다.");
    }
  }, []);

  const onClickLogin: IdFindResultPresenterProps["onClickLogin"] = () => {
    router.push("/login");
  };

  return (
    <IdFindResultPresenter
      onClickLogin={onClickLogin}
      id={id}
      imageName={imageName}
      text={text}
    />
  );
};

export default IdFindResultContainer;
