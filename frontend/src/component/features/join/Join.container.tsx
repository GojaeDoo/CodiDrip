"use client";

import { useState } from "react";
import JoinPresenter from "./Join.presenter";
import { JoinProps } from "./Join.types";
import { overlappingCheck, userJoin } from "./Join.query";

const JoinContainer = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [passwordTrue, setPasswordTrue] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailDomain, setEmailDomain] = useState<string>("");
  const [isIdChecked, setIsIdChecked] = useState<boolean>(false);
  const [isJoinButtonDisabled, setIsJoinButtonDisabled] =
    useState<boolean>(true);

  const onChangeId: JoinProps["onChangeId"] = (event) => {
    setId(event.target.value);
    setIsIdChecked(false);
    setIsJoinButtonDisabled(true);
  };

  const onChangePassword: JoinProps["onChangePassword"] = (event) => {
    setPassword(event.target.value);
  };

  const onChangeRePassword: JoinProps["onChangeRePassword"] = (event) => {
    setRePassword(event.target.value);
    if (password === event.target.value) {
      setPasswordTrue("비밀번호가 일치합니다.");
      setIsJoinButtonDisabled(!isIdChecked);
    } else {
      setPasswordTrue("비밀번호가 일치하지않습니다.");
      setIsJoinButtonDisabled(true);
    }
  };

  const onChangeEmail: JoinProps["onChangeEmail"] = (event) => {
    setEmail(event.target.value);
  };

  const selectEmailDomain: JoinProps["selectEmailDomain"] = (event) => {
    setEmailDomain("@" + event.target.value);
  };

  const onClickIdOverlapping: JoinProps["onClickIdOverlapping"] = async () => {
    try {
      const response = await overlappingCheck(id);
      console.log("성공 : " + JSON.stringify(response, null, 2));
      if (response.exists == "1") {
        alert("중복된 아이디입니다.");
        setIsIdChecked(false);
        setIsJoinButtonDisabled(true);
      } else {
        alert("사용가능한 아이디입니다.");
        setIsIdChecked(true);
        setIsJoinButtonDisabled(password !== rePassword);
      }
    } catch (error) {
      console.error(error);
      setIsIdChecked(false);
      setIsJoinButtonDisabled(true);
    }
  };

  const onClickJoin: JoinProps["onClickJoin"] = async () => {
    if (!isIdChecked) {
      alert("아이디 중복확인을 해주세요.");
      return;
    }

    if (password !== rePassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

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
      isIdChecked={isIdChecked}
      isJoinButtonDisabled={isJoinButtonDisabled}
      setPasswordTrue={passwordTrue}
    />
  );
};

export default JoinContainer;
