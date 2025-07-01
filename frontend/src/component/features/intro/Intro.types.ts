export interface IntroPresenterProps {
  onClickMoveLogin: () => void;
  onClickMoveDrips: () => void;
  brandName: string;
  scatterDirections: Array<{
    tx: string;
    ty: string;
  }>;
}
