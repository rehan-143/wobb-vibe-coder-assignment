import { memo, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useSelectedListStore } from "@/store/selectedListStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}

function ProfileCardComponent({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const toggleProfile = useSelectedListStore((state) => state.toggleProfile);
  const isSelected = useSelectedListStore((state) =>
    state.isSelected(profile.user_id)
  );

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleAddToList = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleProfile(profile);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl mb-3 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all w-full max-w-2xl"
    >
      <img
        src={profile.picture}
        alt={profile.fullname}
        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
      />

      <div className="text-left flex-1 min-w-0">
        <div className="font-semibold text-gray-900 flex items-center gap-1 truncate">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>

        <div className="text-sm text-gray-500 truncate">
          {profile.fullname}
        </div>

        <div className="text-sm text-gray-700 mt-0.5">
          {formatFollowers(profile.followers)} followers
        </div>
      </div>

      <button
        onClick={handleAddToList}
        className={`px-3 py-1.5 text-sm font-medium rounded-lg flex-shrink-0 transition-colors ${
          isSelected
            ? "bg-green-50 text-green-700 border border-green-300 hover:bg-green-100"
            : "bg-gray-900 text-white hover:bg-gray-700"
        }`}
      >
        {isSelected ? "Added ✓" : "Add to List"}
      </button>
    </div>
  );
}

export const ProfileCard = memo(ProfileCardComponent);