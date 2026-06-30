import { useMemo, useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  const handleProfileClick = () => {
    // navigation handled inside ProfileCard
  };

  return (
    <Layout title="Find Influencers">
      <div className="flex flex-col items-center w-full">
        <p className="text-gray-500 mb-6 text-sm max-w-2xl w-full">
          Browse top creators across social platforms
        </p>

        <PlatformFilter
          selected={platform}
          onChange={(p) => {
            setPlatform(p);
            setSearchQuery("");
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <p className="text-xs text-gray-400 mb-3 max-w-2xl w-full">
          Showing {filtered.length} of {allProfiles.length} on {platform}
        </p>

        <ProfileList
          profiles={filtered}
          platform={platform}
          onProfileClick={handleProfileClick}
        />
      </div>
    </Layout>
  );
}