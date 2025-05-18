import { DripPostContainer } from "../../component/features/drip/dripPost/DripPost.container";
import { DripPostAppProps } from "../../component/features/drip/dripPost/DripPost.types";

export const DripPost = (props: DripPostAppProps) => {
  return <DripPostContainer gender={props.gender} isMyPage={false} />;
};

export default DripPost;
