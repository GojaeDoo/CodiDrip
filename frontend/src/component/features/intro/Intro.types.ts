export interface IntroProps {
  onClickLogin: () => void;
  onClickJoin: () => void;
  brandName: string;
  scatterDirections: Array<{
    tx: string;
    ty: string;
  }>;
}
