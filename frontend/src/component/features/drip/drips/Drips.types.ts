export interface DripsProps {
  onClickSelectAll: () => void;
  onClickSelectMen: () => void;
  onClickSelectWomen: () => void;
  onClickSelectStyleCategory: () => void;
  genderSelect: string;
  isDripUser: boolean;
  showStyleFilter: boolean;
  selectedStyles: string[];
  onStyleChange: (style: string) => void;
  onCloseStyleFilter: () => void;
}
