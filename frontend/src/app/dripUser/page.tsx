import DripUserContainer from "@/component/features/drip/dripUser/DripUser.container";
import { DripUserProps } from "@/component/features/drip/dripUser/DripUser.types";

export const DripUser = (props: DripUserProps) => {
  return (
    <>
      <DripUserContainer gender={props.gender} />
    </>
  );
};

export default DripUser;
