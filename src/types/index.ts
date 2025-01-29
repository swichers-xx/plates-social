export interface UserProfile {
	plateNumber: string;
	bio?: string;
	photoUrl?: string;
	vehicle?: {
		type: string;
		color: string;
		description: string;
	};
	interests: string[];
	interactionPreferences: {
		social: boolean;
		romantic: boolean;
		informational: boolean;
	};
	privacySettings: {
		hidePlate: boolean;
		anonymize: boolean;
		contactPermission: 'all' | 'mutual' | 'none';
	};
}

export interface Post {
	id: string;
	authorPlate: string;
	content: string;
	type: 'general' | 'encounter' | 'assistance' | 'romantic' | 'compliment';
	location?: {
		lat: number;
		lng: number;
	};
	timestamp: string;
	media?: {
		type: 'image' | 'video' | 'voice';
		url: string;
	}[];
}

export interface Notification {
	id: string;
	type: 'encounter' | 'alert' | 'message' | 'tag';
	content: string;
	timestamp: string;
	read: boolean;
	fromPlate?: string;
}