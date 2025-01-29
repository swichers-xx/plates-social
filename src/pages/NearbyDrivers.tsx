import { useEffect, useState } from 'react';
import { Box, Paper, Text, Stack } from '@mantine/core';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { UserProfile } from '../types';

const MOCK_NEARBY_DRIVERS: UserProfile[] = [
	{
		plateNumber: 'CA123ABC',
		bio: 'Car enthusiast',
		vehicle: { type: 'Sedan', color: 'Blue', description: 'Tesla Model 3' },
		interests: ['Cars', 'Technology'],
		interactionPreferences: { social: true, romantic: false, informational: true },
		privacySettings: { hidePlate: false, anonymize: false, contactPermission: 'all' }
	}
];

export function NearbyDrivers() {
	const [position, setPosition] = useState<[number, number]>([34.0522, -118.2437]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(pos) => setPosition([pos.coords.latitude, pos.coords.longitude])
		);
	}, []);

	return (
		<Stack spacing="md">
			<Paper p="md">
				<Text size="xl" weight={500}>Nearby Drivers</Text>
			</Paper>
			
			<Box style={{ height: '70vh' }}>
				<MapContainer
					center={position}
					zoom={13}
					style={{ height: '100%', width: '100%' }}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					{MOCK_NEARBY_DRIVERS.map((driver) => (
						<Marker key={driver.plateNumber} position={position}>
							<Popup>
								<Text weight={500}>{driver.plateNumber}</Text>
								<Text size="sm">{driver.vehicle?.description}</Text>
							</Popup>
						</Marker>
					))}
				</MapContainer>
			</Box>
		</Stack>
	);
}