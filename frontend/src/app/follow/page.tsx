import FollowContainer from "@/component/features/follow/Follow.container";
import { FollowPageProps } from "@/component/features/follow/Follow.types";

export const Follow = ({ initialTab, targetUserId }: FollowPageProps) => {
    return (
        <FollowContainer 
            initialTab={initialTab} 
            targetUserId={targetUserId}
        />
    )
}

export default Follow;