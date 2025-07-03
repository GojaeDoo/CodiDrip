"use client";

import { useSearchParams } from "next/navigation";
import FollowContainer from "@/component/features/follow/Follow.container";

const Follow = () => {
    const searchParams = useSearchParams();
    const initialTab = searchParams.get("initialTab") as "followers" | "following" || "followers";
    const targetUserId = searchParams.get("targetUserId") || "";

    return (
        <FollowContainer 
            initialTab={initialTab} 
            targetUserId={targetUserId}
        />
    )
}

export default Follow;