import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useSelectedListStore } from "@/store/selectedListStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const selectedCount = useSelectedListStore(
    (state) => state.selectedProfiles.length
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-semibold text-gray-900 hover:text-gray-700"
          >
            Influencer Search
          </Link>
          <Link
            to="/selected"
            className="text-sm text-gray-700 hover:text-gray-900 flex items-center gap-2 font-medium"
          >
            My List
            {selectedCount > 0 && (
              <span className="bg-gray-900 text-white text-xs rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
                {selectedCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {title && (
          <h1 className="text-2xl font-bold text-gray-900 mb-1 text-left">
            {title}
          </h1>
        )}
        <main>{children}</main>
      </div>
    </div>
  );
}