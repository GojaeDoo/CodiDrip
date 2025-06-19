export interface User {
  user_id: string;
  user_password: string;
  user_email: string;
}

export interface IdCheckType {
  user_id: string;
}

export interface EmailCheckType {
  user_email: string;
}

export interface PasswordFindType {
  user_id: string;
  user_email: string;
}

export interface VerificationCode {
  code: string;
  email: string;
  expiresAt: Date;
}

export interface SearchResult {
  type: 'profile' | 'post';
  id: number;
  name: string;
  image: string;
  user_id: string;
}
