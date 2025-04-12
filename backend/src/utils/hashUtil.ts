// src/utils/hashUtil.ts
import bcrypt from "bcrypt";

// 비밀번호 해싱 함수
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// 비밀번호 검증 함수
export const comparePassword = async (
  hashedPassword: string,
  password: string
): Promise<boolean> => {
  console.log("comparePassword - 해시된 비밀번호:", hashedPassword);
  console.log("comparePassword - 입력된 비밀번호:", password);
  const result = await bcrypt.compare(password, hashedPassword);
  console.log("bcrypt.compare 결과:", result);
  return result;
};
