export const randomLocation = (lat: number, lng: number, radius: number) => {
	const r = radius * Math.sqrt(Math.random());
	const theta = Math.random() * 2 * Math.PI;
	
	return {
		lat: lat + r * Math.cos(theta),
		lng: lng + r * Math.sin(theta)
	};
};