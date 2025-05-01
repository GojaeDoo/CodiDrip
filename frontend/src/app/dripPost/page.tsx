"use client";

import DripPostContainer from "@/component/features/drip/dripPost/DripPost.container";

interface DripPostProps {
  genderSelect: string;
}

const DripPostPage = ({ genderSelect }: DripPostProps) => {
  return <DripPostContainer genderSelect={genderSelect} />;
};

export default DripPostPage;
