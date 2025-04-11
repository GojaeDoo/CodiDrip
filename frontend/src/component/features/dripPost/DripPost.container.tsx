"use client";

import React, { useEffect, useState } from "react";
import DripPostPresenter from "./DripPost.presenter";
import { fetchProfiles } from "./DripPost.query";
import { Profile } from "../../../types/profile";

const DripPostContainer = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [likedProfiles, setLikedProfiles] = useState<Set<number>>(new Set());

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const data = await fetchProfiles();
        setProfiles(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfiles();
  }, []);

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
