"use client";

import { useState } from "react";
import JoinPresenter from "./Join.presenter";
import { JoinProps } from "./Join.types";
import {
  overlappingCheck,
  userJoin,
  emailOverlappingCheck,
} from "./Join.query";
import { useRouter } from "next/navigation";

const JoinContainer = () => {
  const router = useRouter();

  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [passwordTrue, setPasswordTrue] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailDomain, setEmailDomain] = useState<string>("");
  const [isIdChecked, setIsIdChecked] = useState<boolean>(false);
  const [isJoinButtonDisabled, setIsJoinButtonDisabled] =
    useState<boolean>(true);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isServiceChecked, setIsServiceChecked] = useState<boolean>(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState<boolean>(false);
  const [isMarketingChecked, setIsMarketingChecked] = useState<boolean>(false);
  const [isCustomDomain, setIsCustomDomain] = useState<boolean>(false);
  const [customDomain, setCustomDomain] = useState<string>("");

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*])[a-zA-Z0-9~!@#$%^&*]{8,15}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const isPasswordValid =
      validatePassword(password) && password === rePassword;
    const isEmailValid = email && (isCustomDomain ? customDomain : emailDomain);
    const isRequiredAgreementsChecked = isServiceChecked && isPrivacyChecked;

    return (
      isIdChecked &&
      isPasswordValid &&
      isEmailValid &&
      isRequiredAgreementsChecked
    );
  };

  const onChangeId: JoinProps["onChangeId"] = (event) => {
    setId(event.target.value);
    setIsIdChecked(false);
    setIsJoinButtonDisabled(true);
  };

  const onChangePassword: JoinProps["onChangePassword"] = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (!validatePassword(newPassword)) {
      setPasswordTrue(
        "영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리로 입력해주세요."
      );
      setIsJoinButtonDisabled(true);
    } else if (rePassword && newPassword !== rePassword) {
      setPasswordTrue("비밀번호가 일치하지않습니다.");
      setIsJoinButtonDisabled(true);
    } else if (rePassword && newPassword === rePassword) {
      setPasswordTrue("비밀번호가 일치합니다.");
      setIsJoinButtonDisabled(!validateForm());
    } else {
      setPasswordTrue("");
      setIsJoinButtonDisabled(!validateForm());
    }
  };

  const onChangeRePassword: JoinProps["onChangeRePassword"] = (event) => {
    const newRePassword = event.target.value;
    setRePassword(newRePassword);

    if (!validatePassword(password)) {
      setPasswordTrue(
        "영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리로 입력해주세요."
      );
      setIsJoinButtonDisabled(true);
    } else if (password !== newRePassword) {
      setPasswordTrue("비밀번호가 일치하지않습니다.");
      setIsJoinButtonDisabled(true);
    } else {
      setPasswordTrue("비밀번호가 일치합니다.");
      setIsJoinButtonDisabled(!validateForm());
    }
  };

  const onChangeEmail: JoinProps["onChangeEmail"] = (event) => {
    setEmail(event.target.value);
    setIsJoinButtonDisabled(!validateForm());
  };

  const selectEmailDomain: JoinProps["selectEmailDomain"] = (event) => {
    const value = event.target.value;
    if (value === "") {
      setIsCustomDomain(true);
      setEmailDomain("");
    } else {
      setIsCustomDomain(false);
      setEmailDomain("@" + value);
    }
    setIsJoinButtonDisabled(!validateForm());
  };

  const onChangeCustomDomain: JoinProps["onChangeCustomDomain"] = (event) => {
    const value = event.target.value;
    setCustomDomain(value);
    setEmailDomain(value ? "@" + value : "");
    setIsJoinButtonDisabled(!validateForm());
  };

  const onAllCheckChange: JoinProps["onAllCheckChange"] = (event) => {
    const checked = event.target.checked;
    setIsAllChecked(checked);
    setIsServiceChecked(checked);
    setIsPrivacyChecked(checked);
    setIsMarketingChecked(checked);
    setIsJoinButtonDisabled(!validateForm());
  };

  const onServiceCheckChange: JoinProps["onServiceCheckChange"] = (event) => {
    const checked = event.target.checked;
    setIsServiceChecked(checked);
    setIsAllChecked(checked && isPrivacyChecked && isMarketingChecked);
    setIsJoinButtonDisabled(!validateForm());
  };

  const onPrivacyCheckChange: JoinProps["onPrivacyCheckChange"] = (event) => {
    const checked = event.target.checked;
    setIsPrivacyChecked(checked);
    setIsAllChecked(checked && isServiceChecked && isMarketingChecked);
    setIsJoinButtonDisabled(!validateForm());
  };

  const onMarketingCheckChange: JoinProps["onMarketingCheckChange"] = (
    event
  ) => {
    const checked = event.target.checked;
    setIsMarketingChecked(checked);
    setIsAllChecked(checked && isServiceChecked && isPrivacyChecked);
    setIsJoinButtonDisabled(!validateForm());
  };

  const onClickIdOverlapping: JoinProps["onClickIdOverlapping"] = async () => {
    try {
      console.log("id : " + id);

      const response = await overlappingCheck(id);
      console.log("성공 : " + JSON.stringify(response, null, 2));
      if (response.exists == "1") {
        alert("중복된 아이디입니다.");
        setIsIdChecked(false);
        setIsJoinButtonDisabled(true);
      } else {
        alert("사용가능한 아이디입니다.");
        setIsIdChecked(true);
        setIsJoinButtonDisabled(!validateForm());
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

    if (!validatePassword(password)) {
      alert(
        "비밀번호는 영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리로 입력해주세요."
      );
      return;
    }

    if (password !== rePassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (
      !email ||
      (!isCustomDomain && !emailDomain) ||
      (isCustomDomain && !customDomain)
    ) {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (!isServiceChecked || !isPrivacyChecked) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    const fullEmail =
      email + (isCustomDomain ? "@" + customDomain : emailDomain);

    try {
      const emailCheck = await emailOverlappingCheck(fullEmail);
      if (emailCheck.exists === "1") {
        alert("이미 사용 중인 이메일입니다.");
        return;
      }

      const userData = {
        user_id: id,
        user_password: password,
        user_email: fullEmail,
      };

      await userJoin(userData);
      alert("회원가입되었습니다.");
      router.push("/login");
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
      isAllChecked={isAllChecked}
      isServiceChecked={isServiceChecked}
      isPrivacyChecked={isPrivacyChecked}
      isMarketingChecked={isMarketingChecked}
      onAllCheckChange={onAllCheckChange}
      onServiceCheckChange={onServiceCheckChange}
      onPrivacyCheckChange={onPrivacyCheckChange}
      onMarketingCheckChange={onMarketingCheckChange}
      isCustomDomain={isCustomDomain}
      onChangeCustomDomain={onChangeCustomDomain}
      customDomain={customDomain}
    />
  );
};

export default JoinContainer;
