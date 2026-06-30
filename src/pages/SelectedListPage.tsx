import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useSelectedListStore } from "@/store/selectedListStore";

export function SelectedListPage() {
  const navigate = useNavigate();
  const selectedProfiles = useSelectedListStore((state) => state.selectedProfiles);
  const removeProfile = useSelectedListStore((state) => state.removeProfile);
  const clearAll = useSelectedListStore((state) => state.clearAll);

  return (
    <Layout title="My Selected List">
      <p className="text-gray-500 mb-4 text-sm">
        {selectedProfiles.length} profile{selectedProfiles.length !== 1 ? "s" : ""} selected
      </p>

      {selectedProfiles.length === 0 ? (
        <div className="text-center text-gray-400 py-16">
          <p className="mb-2">No profiles added yet.</p>
          <Link to="/" className="text-sm text-gray-900 underline font-medium">
            Go back to search
          </Link>
        </div>
      ) : (
        <>
          <button
            onClick={clearAll}
            className="mb-4 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear all
          </button>

          <div className="flex flex-col w-full">
            {selectedProfiles.map((profile) => (
              <div
                key={profile.user_id}
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl mb-3"
              >
                <img
                  src={profile.picture}
                  alt={profile.fullname}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0 cursor-pointer"
                  onClick={() => navigate(`/profile/${profile.username}`)}
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
                  onClick={() => removeProfile(profile.user_id)}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors flex-shrink-0"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}