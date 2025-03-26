"use client";

import { useState } from "react";
import JoinPresenter from "./Join.presenter";
import { JoinProps } from "./Join.types";
import { overlappingCheck, userJoin } from "./Join.query";

const JoinContainer = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailDomain, setEmailDomain] = useState<string>("");

  const onChangeId: JoinProps["onChangeId"] = (event) => {
    setId(event.target.value);
  };

  const onChangePassword: JoinProps["onChangePassword"] = (event) => {
    setPassword(event.target.value);
  };

  const onChangeRePassword: JoinProps["onChangeRePassword"] = (event) => {
    setRePassword(event.target.value);
  };

  const onChangeEmail: JoinProps["onChangeEmail"] = (event) => {
    setEmail(event.target.value);
  };

  const selectEmailDomain: JoinProps["selectEmailDomain"] = (event) => {
    setEmailDomain("@" + event.target.value);
  };

  const onClickIdOverlapping: JoinProps["onClickIdOverlapping"] = async () => {
    try {
      console.log("id : " + id);

      const response = await overlappingCheck(id);
      console.log("성공 : " + JSON.stringify(response, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const onClickJoin: JoinProps["onClickJoin"] = async () => {
    const fullEmail = email + emailDomain;
    const userData = {
      user_id: id,
      user_password: password,
      user_email: fullEmail,
    };
    try {
      const response = await userJoin(userData);
      console.log("회원가입 성공 : " + response);
    } catch (error) {
      console.log("회원가입 실패 : " + error);
    }
  };

  return (
    <JoinPresenter
      onChangeId={onChangeId}
      onChangePassword={onChangePassword}
      onChangeRePassword={onChangeRePassword}
      onChangeEmail={onChangeEmail}
      selectEmailDomain={selectEmailDomain}
      onClickJoin={onClickJoin}
      onClickIdOverlapping={onClickIdOverlapping}
    />
  );
};

export default JoinContainer;
