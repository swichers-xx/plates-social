import L from 'leaflet';
import { Marker } from 'react-leaflet';

// Create custom SVG markers
const createSvgIcon = (color: string) => {
	const svg = `
		<svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
				<feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
			</filter>
			<path d="M18 0C8.064 0 0 8.064 0 18c0 8.01 9.42 19.476 14.76 25.596C16.596 45.54 17.28 46 18 46c.72 0 1.404-.46 3.24-2.404C26.58 37.476 36 26.01 36 18c0-9.936-8.064-18-18-18z" 
				fill="${color}" filter="url(#shadow)"/>
			<circle cx="18" cy="18" r="6" fill="white"/>
		</svg>`;

	return new L.DivIcon({
		html: svg,
		className: 'custom-marker',
		iconSize: [36, 48],
		iconAnchor: [18, 48],
		popupAnchor: [0, -48],
	});
};

// Create icons with different colors
const userIcon = createSvgIcon('#3B82F6'); // Blue
const otherIcon = createSvgIcon('#10B981'); // Green

type CustomMarkerProps = {
	position: [number, number];
	isUser?: boolean;
	children?: React.ReactNode;
};

export function CustomMarker({ position, isUser, children }: CustomMarkerProps) {
	return (
		<Marker position={position} icon={isUser ? userIcon : otherIcon}>
			{children}
		</Marker>
	);
}