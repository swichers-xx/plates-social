import { WebSocket, WebSocketServer } from 'ws';
import { randomLocation } from './utils';

interface Location {
	lat: number;
	lng: number;
}

interface Client extends WebSocket {
	id?: string;
	location?: Location;
}

class WebSocketHandler {
	private wss: WebSocketServer;
	private clients: Map<string, Client>;

	constructor(port: number) {
		this.wss = new WebSocketServer({ port });
		this.clients = new Map();
		this.init();
	}

	private init() {
		this.wss.on('connection', (ws: Client) => {
			const id = Math.random().toString(36).substring(7);
			ws.id = id;
			this.clients.set(id, ws);

			ws.on('message', (message: string) => {
				try {
					const data = JSON.parse(message.toString());
					this.handleMessage(ws, data);
				} catch (error) {
					console.error('Failed to parse message:', error);
				}
			});

			ws.on('close', () => {
				if (ws.id) {
					this.clients.delete(ws.id);
				}
			});
		});
	}

	private handleMessage(client: Client, data: any) {
		switch (data.type) {
			case 'updateLocation':
				if (client.id && data.location) {
					client.location = data.location;
					this.broadcastNearbyClients(client);
				}
				break;
			default:
				console.warn('Unknown message type:', data.type);
		}
	}

	private broadcastNearbyClients(client: Client) {
		if (!client.location || !client.id) return;

		const nearbyClients = Array.from(this.clients.values())
			.filter(c => c.id !== client.id && c.location)
			.map(c => ({
				id: c.id,
				location: c.location
			}));

		client.send(JSON.stringify({
			type: 'nearbyClients',
			clients: nearbyClients
		}));
	}
}

export default WebSocketHandler;