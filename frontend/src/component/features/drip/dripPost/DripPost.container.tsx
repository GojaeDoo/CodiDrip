"use client";

import React, { useEffect, useState } from "react";
import DripPostPresenter from "./DripPost.presenter";
import { Profile } from "../../../../types/profile";

interface DripPostContainerProps {
  genderSelect: string;
}

const DripPostContainer = ({ genderSelect }: DripPostContainerProps) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [likedProfiles, setLikedProfiles] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/profiles");
        const data = await response.json();
        // genderSelect에 따라 프로필 필터링
        const filteredProfiles =
          genderSelect === "all"
            ? data
            : data.filter(
                (profile: Profile) => profile.gender === genderSelect
              );
        setProfiles(filteredProfiles);
      } catch (error) {
        console.error("프로필을 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [genderSelect]);

  const handleLike = (id: number) => {
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
    <DripPostPresenter
      profiles={profiles}
      likedProfiles={likedProfiles}
      onLike={handleLike}
    />
  );
};

export default DripPostContainer;
