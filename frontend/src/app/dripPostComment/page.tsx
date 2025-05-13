import DripPostCommentContainer from "@/component/features/drip/dripPostComment/DripPostComment.container";
import { DripPostCommentProps } from "@/component/features/drip/dripPostComment/DripPostComment.types";

export const DripPostComment = (props: DripPostCommentProps) => {
  return (
    <>
      <DripPostCommentContainer postno={props.postno} />
    </>
  );
};

export default DripPostComment;
