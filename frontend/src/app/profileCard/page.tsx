"use client";

import { useSearchParams } from "next/navigation";
import ProfileCardContainer from "@/component/features/profile/profileCard/ProfileCard.container";

const ProfileCardPage = () => {
  const searchParams = useSearchParams();
  const genderSelect = searchParams.get("genderSelect") || "";

  return <ProfileCardContainer genderSelect={genderSelect} />;
};

export default ProfileCardPage;
