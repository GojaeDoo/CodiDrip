"use client";

import { useRouter, useSearchParams } from "next/navigation";
import IdFindSuccessPresenter from "./IdFindSuccess.presenter";
import { IdFindSuccessProps } from "./IdFindSuccess.types";

export const IdFindSuccessContainer = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  const onClickLogin: IdFindSuccessProps["onClickLogin"] = () => {
    router.push("/login");
  };

  return <IdFindSuccessPresenter onClickLogin={onClickLogin} id={id} />;
};

export default IdFindSuccessContainer;
