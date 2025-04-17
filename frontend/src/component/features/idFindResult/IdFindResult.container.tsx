"use client";

import { useRouter, useSearchParams } from "next/navigation";
import IdFindResultPresenter from "./IdFindResult.presenter";
import { IdFindResultProps } from "./IdFindResult.types";

export const IdFindResultContainer = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  console.log("id : " + id);

  const onClickLogin: IdFindResultProps["onClickLogin"] = () => {
    router.push("/login");
  };

  return <IdFindResultPresenter onClickLogin={onClickLogin} id={id} />;
};

export default IdFindResultContainer;
