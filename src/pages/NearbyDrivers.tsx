import { useEffect, useState } from 'react';
import { Box, Paper, Text, Stack, Group, Badge, ActionIcon, Tooltip, Card } from '@mantine/core';
import { MapContainer, TileLayer, Popup, useMap, ZoomControl } from 'react-leaflet';
import { IconRefresh, IconMapPin, IconUsers } from '@tabler/icons-react';
import 'leaflet/dist/leaflet.css';
import { wsService } from '../services/websocket';
import { CustomMarker } from '../components/Map/CustomMarker';

type NearbyClient = {
	id: string;
	location: {
		lat: number;
		lng: number;
	};
};

function MapUpdater({ center }: { center: [number, number] }) {
	const map = useMap();
	useEffect(() => {
		map.setView(center);
	}, [center, map]);
	return null;
}

export function NearbyDrivers() {
	const [position, setPosition] = useState<[number, number]>([34.0522, -118.2437]);
	const [nearbyClients, setNearbyClients] = useState<NearbyClient[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const watchId = navigator.geolocation.watchPosition(
			(pos) => {
				const newPosition: [number, number] = [pos.coords.latitude, pos.coords.longitude];
				setPosition(newPosition);
				wsService.sendLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
			}
		);

		wsService.connect();
		const unsubscribe = wsService.subscribe(setNearbyClients);

		return () => {
			navigator.geolocation.clearWatch(watchId);
			unsubscribe();
		};
	}, []);

	const refreshLocation = async () => {
		setIsLoading(true);
		try {
			const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			const newPosition: [number, number] = [pos.coords.latitude, pos.coords.longitude];
			setPosition(newPosition);
			wsService.sendLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
		} catch (error) {
			console.error('Failed to get location:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Stack spacing="md">
			<Group grow>
				<Card withBorder p="md">
					<Group>
						<IconMapPin size={24} style={{ color: 'var(--mantine-color-blue-6)' }} />
						<div>
							<Text size="sm" c="dimmed">Your Location</Text>
							<Text fw={500}>{position[0].toFixed(4)}, {position[1].toFixed(4)}</Text>
						</div>
					</Group>
				</Card>
				<Card withBorder p="md">
					<Group>
						<IconUsers size={24} style={{ color: 'var(--mantine-color-blue-6)' }} />
						<div>
							<Text size="sm" c="dimmed">Nearby Users</Text>
							<Text fw={500}>{nearbyClients.length} Active</Text>
						</div>
					</Group>
				</Card>
			</Group>
			
			<Paper p="md" withBorder radius="md" style={{ position: 'relative' }}>
				<Box style={{ height: '70vh' }}>
					<MapContainer
						center={position}
						zoom={14}
						style={{ height: '100%', width: '100%' }}
						zoomControl={false}
					>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						/>
						<ZoomControl position="bottomright" />
						<MapUpdater center={position} />
						<CustomMarker position={position} isUser>
							<Popup>
								<Text fw={500}>Your Location</Text>
								<Text size="sm" c="dimmed">
									{position[0].toFixed(6)}, {position[1].toFixed(6)}
								</Text>
							</Popup>
						</CustomMarker>
						{nearbyClients.map((client) => (
							<CustomMarker 
								key={client.id} 
								position={[client.location.lat, client.location.lng]}
							>
								<Popup>
									<Stack spacing={5}>
										<Text fw={500}>User {client.id}</Text>
										<Text size="sm" c="dimmed">
											{client.location.lat.toFixed(6)}, {client.location.lng.toFixed(6)}
										</Text>
									</Stack>
								</Popup>
							</CustomMarker>
						))}
					</MapContainer>
					<Tooltip label="Refresh location">
						<ActionIcon 
							onClick={refreshLocation} 
							variant="filled" 
							loading={isLoading}
							size="lg"
							radius="md"
							style={{
								position: 'absolute',
								top: '1rem',
								right: '1rem',
								zIndex: 1000
							}}
						>
							<IconRefresh size={20} />
						</ActionIcon>
					</Tooltip>
				</Box>
			</Paper>
		</Stack>
	);
}