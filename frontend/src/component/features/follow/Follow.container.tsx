"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FollowPresenter from "./Follow.presenter";
import { FollowPresenterProps, FollowProps, Profile } from "./Follow.types";
import { getFollowersQuery, getFollowingQuery } from "./Follow.query";

interface FollowContainerProps {
    initialTab?: 'followers' | 'following';
    targetUserId?: string;
}

export const FollowContainer = ({ initialTab = 'followers', targetUserId }: FollowContainerProps) => {
    const [activeTab, setActiveTab] = useState<'followers' | 'following'>(initialTab);
    const [followers, setFollowers] = useState<Profile[]>([]);
    const [following, setFollowing] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    useEffect(() => {
        const fetchData = async () => {
            // targetUserId가 있으면 해당 유저의 팔로워/팔로잉 목록을 가져옴
            // 없으면 현재 로그인한 사용자의 팔로워/팔로잉 목록을 가져옴
            const storedUserId = localStorage.getItem("userId");
            const queryUserId = searchParams.get("userId");
            const userId = targetUserId || queryUserId || storedUserId;
            
            if (!userId) {
                alert("사용자 ID가 필요합니다.");
                return;
            }

            setIsLoading(true);
            try {
                const [followersData, followingData] = await Promise.all([
                    getFollowersQuery(userId),
                    getFollowingQuery(userId)
                ]);
                setFollowers(followersData);
                setFollowing(followingData);
            } catch (error) {
                console.error("팔로우 데이터 로드 실패:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [searchParams, targetUserId]);

    const handleTabChange = (tab: 'followers' | 'following') => {
        setActiveTab(tab);
    };

    return <FollowPresenter
    followers={followers}
    following={following}
    activeTab={activeTab}
    onTabChange={handleTabChange}
    isLoading={isLoading}
    />;
};

export default FollowContainer;