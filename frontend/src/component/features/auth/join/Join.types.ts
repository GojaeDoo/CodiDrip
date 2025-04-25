export interface JoinProps {
  onChangeId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeRePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectEmailDomain: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickJoin: () => void;
  onClickIdOverlapping: () => void;
  onClickEmailOverlapping: () => void;
  isIdChecked: boolean;
  isEmailChecked: boolean;
  isJoinButtonDisabled: boolean;
  setPasswordTrue: string;
  isAllChecked: boolean;
  isServiceChecked: boolean;
  isPrivacyChecked: boolean;
  isMarketingChecked: boolean;
  onAllCheckChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onServiceCheckChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPrivacyCheckChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMarketingCheckChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isCustomDomain: boolean;
  onChangeCustomDomain: (event: React.ChangeEvent<HTMLInputElement>) => void;
  customDomain: string;
}
