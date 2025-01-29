import { create } from 'zustand';
import { UserProfile } from '../types';

interface AppState {
	currentUser: UserProfile | null;
	nearbyDrivers: UserProfile[];
	setCurrentUser: (user: UserProfile | null) => void;
	setNearbyDrivers: (drivers: UserProfile[]) => void;
}

export const useStore = create<AppState>((set) => ({
	currentUser: null,
	nearbyDrivers: [],
	setCurrentUser: (user) => set({ currentUser: user }),
	setNearbyDrivers: (drivers) => set({ nearbyDrivers: drivers }),
}));