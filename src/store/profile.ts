// State management for current profile

const PROFILE_KEY = 'clonen_profile';

export interface ProfileState {
  currentProfileId: string | null;
  setProfile: (id: string) => void;
  getProfileId: () => string | null;
}

const isBrowser = typeof window !== 'undefined';

export const profileStore: ProfileState = {
  currentProfileId: isBrowser 
    ? localStorage.getItem(PROFILE_KEY) || null
    : null,

  setProfile(id: string) {
    this.currentProfileId = id;
    if (isBrowser) {
      localStorage.setItem(PROFILE_KEY, id);
    }
  },

  getProfileId(): string | null {
    return this.currentProfileId;
  },
};
