export type EventType =
  | "trip_started"
  | "trip_completed"
  | "booking_made"
  | "cancellation";

// event shape
export interface RideEvent {
  id: string;
  type: EventType;
  userId: string;
  timestamp: string;
  metadata?: Record<string, string | number>;
}

// in-memory list
const events: RideEvent[] = [];

// add event with auto id + timestamp
export function addEvent(event: Omit<RideEvent, "id" | "timestamp">): RideEvent {
  const newEvent: RideEvent = {
    ...event,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  events.push(newEvent);
  return newEvent;
}

// return all events
export function getEvents(): RideEvent[] {
  return [...events];
}