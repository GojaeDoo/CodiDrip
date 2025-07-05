"use client";

import { useState } from "react";
import IdFindPresenter from "./IdFind.presenter";
import { IdFindPresenterProps } from "./IdFind.types";
import { getIdFindUserQuery } from "./IdFind.query";
import { useRouter } from "next/navigation";
import ProtectedAuthRoute from "@/component/commons/ProtectedAuthRoute";

export const IdFindContainer = () => {
  const [email, setEmail] = useState("");

  const router = useRouter();

  const onChangeEmail: IdFindPresenterProps["onChangeEmail"] = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const handleKeyDown: IdFindPresenterProps["handleKeyDown"] = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onClickIdFind();
    }
  };

  const onClickIdFind: IdFindPresenterProps["onClickIdFind"] = async () => {
    try {
      const response = await getIdFindUserQuery(email);
      if (
        response.findId &&
        response.findId.length > 0 &&
        response.findId[0].user_id
      ) {
        const userId = response.findId[0].user_id;
        const result = true;
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
    <ProtectedAuthRoute>
      <IdFindPresenter
        onChangeEmail={onChangeEmail}
        onClickIdFind={onClickIdFind}
        handleKeyDown={handleKeyDown}
      />
    </ProtectedAuthRoute>
  );
};

export default IdFindContainer;
