import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-6 w-full max-w-2xl">
      <div className="flex gap-2 mb-4">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected === p
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by username or name..."
        aria-label="Search profiles"
        className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
      />
    </div>
  );
}