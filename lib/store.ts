export type EventType =
    | "trip_started"
    | "trip_completed"
    | "booking_made"
    | "cancelleation";



export interface RideEvent {
    id: string;
    type: EventType;
    userId: string;
    timestamp: string;
    metadata?: Record<string, string | number>;
}


const events: RideEvent[] = [];

export function addEvent(event: Omit<RideEvent, "id" | "timestamp">): RideEvent {
    const newEvent: RideEvent = {
        ...event,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
    };
    events.push(newEvent);
    return newEvent;
}

export function getEvents(): RideEvent[] {
    return [...events];
}