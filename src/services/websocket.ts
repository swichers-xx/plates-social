type Location = {
	lat: number;
	lng: number;
};

type NearbyClient = {
	id: string;
	location: Location;
};

type ServerMessage = {
	type: string;
	clients: NearbyClient[];
};

class WebSocketService {
	private ws: WebSocket | null = null;
	private subscribers: ((data: NearbyClient[]) => void)[] = [];

	connect() {
		this.ws = new WebSocket('ws://localhost:8080');
		
		this.ws.onmessage = (event) => {
			const message: ServerMessage = JSON.parse(event.data);
			if (message.type === 'nearbyClients') {
				this.subscribers.forEach(callback => callback(message.clients));
			}
		};

		this.ws.onclose = () => {
			setTimeout(() => this.connect(), 1000);
		};

		this.ws.onopen = () => {
			this.sendLocation();
		};
	}

	sendLocation(location?: Location) {
		if (this.ws?.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify({
				type: 'updateLocation',
				location: location || { lat: 0, lng: 0 }
			}));
		}
	}

	subscribe(callback: (data: NearbyClient[]) => void) {
		this.subscribers.push(callback);
		return () => {
			this.subscribers = this.subscribers.filter(cb => cb !== callback);
		};
	}
}

export const wsService = new WebSocketService();