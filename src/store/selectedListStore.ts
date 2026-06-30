import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface SelectedListState {
  selectedProfiles: UserProfileSummary[];
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (userId: string) => void;
  toggleProfile: (profile: UserProfileSummary) => void;
  isSelected: (userId: string) => boolean;
  clearAll: () => void;
}

export const useSelectedListStore = create<SelectedListState>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],

      addProfile: (profile) => {
        const exists = get().selectedProfiles.some(
          (p) => p.user_id === profile.user_id
        );
        if (exists) return;
        set((state) => ({
          selectedProfiles: [...state.selectedProfiles, profile],
        }));
      },

      removeProfile: (userId) => {
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter(
            (p) => p.user_id !== userId
          ),
        }));
      },

      toggleProfile: (profile) => {
        const exists = get().selectedProfiles.some(
          (p) => p.user_id === profile.user_id
        );
        if (exists) {
          get().removeProfile(profile.user_id);
        } else {
          get().addProfile(profile);
        }
      },

      isSelected: (userId) => {
        return get().selectedProfiles.some((p) => p.user_id === userId);
      },

      clearAll: () => set({ selectedProfiles: [] }),
    }),
    {
      name: "wobb-selected-profiles",
    }
  )
);