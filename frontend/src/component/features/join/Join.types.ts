export interface JoinProps {
  onChangeId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeRePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectEmailDomain: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickJoin: () => void;
  onClickIdOverlapping: () => void;
  setPasswordTrue: string;
  isIdChecked: boolean;
  isJoinButtonDisabled: boolean;
}
