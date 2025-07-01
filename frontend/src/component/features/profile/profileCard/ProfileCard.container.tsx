"use client";

import React, { useEffect, useState } from "react";
import ProfileCardPresenter from "./ProfileCard.presenter";
import { Profile } from "../../../layout/header/Header.types";
import { ProfileCardContainerProps } from "./ProfileCard.types";
import { getProfilesQuery } from "./ProfileCard.query";

const ProfileCardContainer = ({ genderSelect }: ProfileCardContainerProps) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [likedProfiles, setLikedProfiles] = useState<Set<number>>(new Set());

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setIsLoading(true);
        const data = await getProfilesQuery();
        const filteredProfiles =
          genderSelect === "all"
            ? data
            : data.filter(
                (profile: Profile) => profile.gender === genderSelect
              );
        setProfiles(filteredProfiles);
      } catch (error) {
        console.error("프로필을 불러오는 중 오류가 발생했습니다:", error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfiles();
  }, [genderSelect]);

  const onLike = (id: number) => {
    setLikedProfiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profiles</div>;
  if (!profiles?.length) return <div>No profiles found</div>;

  return (
    <ProfileCardPresenter
      profiles={profiles}
      likedProfiles={likedProfiles}
      onLike={onLike}
    />
  );
};

export default ProfileCardContainer;
