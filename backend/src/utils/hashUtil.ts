// src/utils/hashUtil.ts
import bcrypt from "bcrypt";

// 비밀번호 해싱 함수
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // 솔트 라운드 수 (보안 강도)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// 비밀번호 검증 함수
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
