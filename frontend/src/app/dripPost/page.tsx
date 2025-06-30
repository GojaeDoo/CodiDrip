import { DripPostContainer } from "../../component/features/drip/dripPost/DripPost.container";
import { DripPostAppProps } from "../../component/features/drip/dripPost/DripPost.types";

export const DripPost = (props: DripPostAppProps) => {
  return <DripPostContainer 
    gender={props.gender} 
    isMyPage={props.isMyPage} 
    userId={props.userId} 
    isLike={props.isLike} 
    isSaved={props.isSaved}
    selectedStyles={props.selectedStyles}
  />;
};

export default DripPost;
