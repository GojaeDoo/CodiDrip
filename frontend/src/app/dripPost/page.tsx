"use client";

import DripPostContainer from "@/component/features/dripPost/DripPost.container";

interface DripPostProps {
  genderSelect: string;
}

const DripPostPage = ({ genderSelect }: DripPostProps) => {
  return <DripPostContainer genderSelect={genderSelect} />;
};

export default DripPostPage;
