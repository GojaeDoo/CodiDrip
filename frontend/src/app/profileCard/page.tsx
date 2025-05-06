"use client";

import ProfileCardContainer from "@/component/features/profile/profileCard/ProfileCard.container";

interface ProfileCardProps {
  genderSelect: string;
}

const ProfileCardPage = ({ genderSelect }: ProfileCardProps) => {
  return <ProfileCardContainer genderSelect={genderSelect} />;
};

export default ProfileCardPage;
