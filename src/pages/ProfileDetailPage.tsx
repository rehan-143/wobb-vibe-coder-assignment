import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useSelectedListStore } from "@/store/selectedListStore";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);

  const toggleProfile = useSelectedListStore((state) => state.toggleProfile);
  const isSelected = useSelectedListStore((state) =>
    profileData ? state.isSelected(profileData.data.user_profile.user_id) : false
  );

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-gray-400">Loading...</p>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-red-600 mb-4">
          Could not load profile details for {username}
        </p>
        <Link to="/" className="text-gray-900 underline font-medium text-sm">
          Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  const stats: { label: string; value: string }[] = [
    { label: "Followers", value: formatFollowers(user.followers) },
    { label: "Engagement Rate", value: formatEngagementRate(user.engagement_rate) },
  ];
  if (user.posts_count !== undefined) {
    stats.push({ label: "Posts", value: String(user.posts_count) });
  }
  if (user.avg_likes !== undefined) {
    stats.push({ label: "Avg Likes", value: formatFollowers(user.avg_likes) });
  }
  if (user.avg_comments !== undefined) {
    stats.push({ label: "Avg Comments", value: String(user.avg_comments) });
  }
  if (user.avg_views !== undefined && user.avg_views > 0) {
    stats.push({ label: "Avg Views", value: formatFollowers(user.avg_views) });
  }
  if (user.engagements !== undefined) {
    stats.push({ label: "Engagements", value: String(user.engagements) });
  }

  return (
    <Layout>
      <Link
        to="/"
        className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-flex items-center gap-1"
      >
        ← Back to search
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex gap-5 items-start">
          <img
            src={user.picture}
            alt={user.fullname}
            className="w-20 h-20 rounded-full object-cover border border-gray-200 flex-shrink-0"
          />
          <div className="flex-1 min-w-0 text-left">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-1">
              @{user.username}
              <VerifiedBadge verified={user.is_verified} />
            </h2>
            <p className="text-gray-600">{user.fullname}</p>
            <p className="text-xs text-gray-400 mt-1 capitalize">
              Platform: {platform}
            </p>
          </div>
        </div>

        {user.description && (
          <p className="mt-4 text-sm text-gray-700 text-left">
            {user.description}
          </p>
        )}

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border border-gray-200 p-3 rounded-xl text-left"
            >
              <div className="text-gray-500 text-xs">{stat.label}</div>
              <div className="font-semibold text-gray-900 mt-0.5">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => toggleProfile(user)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              isSelected
                ? "bg-green-50 text-green-700 border border-green-300 hover:bg-green-100"
                : "bg-gray-900 text-white hover:bg-gray-700"
            }`}
          >
            {isSelected ? "Added to List ✓" : "Add to List"}
          </button>

          {user.url && (
            <a
              href={user.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              View on platform →
            </a>
          )}
        </div>
      </div>
    </Layout>
  );
}