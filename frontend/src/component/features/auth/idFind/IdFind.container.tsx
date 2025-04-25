"use client";

import { useState } from "react";
import IdFindPresenter from "./IdFind.presenter";
import { IdFindProps } from "./IdFind.types";
import { IdFindUser } from "./IdFind.query";
import { useRouter } from "next/navigation";
export const IdFindContainer = () => {
  const [email, setEmail] = useState("");
  const [findId, setFindId] = useState("");

  const router = useRouter();

  const onChangeEmail: IdFindProps["onChangeEmail"] = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const handleKeyDown: IdFindProps["handleKeyDown"] = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onClickIdFind();
    }
  };

  const onClickIdFind: IdFindProps["onClickIdFind"] = async () => {
    try {
      const response = await IdFindUser(email);
      console.log(response);
      if (
        response.findId &&
        response.findId.length > 0 &&
        response.findId[0].user_id
      ) {
        const userId = response.findId[0].user_id;
        const result = true;
        setFindId(userId);
        router.push(`/idFindResult?id=${userId}&result=${result}`);
      } else {
        const result = false;
        router.push(`/idFindResult?result=${result}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IdFindPresenter
      onChangeEmail={onChangeEmail}
      onClickIdFind={onClickIdFind}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default IdFindContainer;
