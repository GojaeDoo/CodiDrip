export interface FreeBoardEditPresenterProps {
  onChangeTitle: (event:React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (event:React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickSend: () => void;
  onClickCancel: () => void;
  titleLength: number;
  contentLength: number;
  status: boolean;
  title: string;
  content: string;
}
