"use client";

import { useEffect, useState } from "react";
import { RideEvent } from "@/lib/store";

// calculates how many times each event type appears
function getStats(events: RideEvent[]) {
  return {
    trip_started: events.filter(e => e.type === "trip_started").length,
    trip_completed: events.filter(e => e.type === "trip_completed").length,
    booking_made: events.filter(e => e.type === "booking_made").length,
    cancellation: events.filter(e => e.type === "cancellation").length,
  };
}

// main dashboard component
export default function Dashboard() {

  // holds all events fetched from the API
  const [events, setEvents] = useState<RideEvent[]>([]);

  // tracks whether data is still loading
  const [loading, setLoading] = useState(true);

  // fetches events from the API when the page first loads
  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  // calculate stats from the fetched events
  const stats = getStats(events);

  // show loading state while fetching
  if (loading) {
    return <div className="p-8 text-gray-500">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">

      {/* header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kamel Ride</h1>
        <p className="text-gray-500 text-sm mt-1">Live event analytics</p>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
        <StatCard label="Trips Started" value={stats.trip_started} color="blue" />
        <StatCard label="Trips Completed" value={stats.trip_completed} color="green" />
        <StatCard label="Bookings Made" value={stats.booking_made} color="purple" />
        <StatCard label="Cancellations" value={stats.cancellation} color="red" />
      </div>

      {/* recent events table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Recent Events</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.slice().reverse().map(event => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  <EventBadge type={event.type} />
                </td>
                <td className="px-6 py-3 text-gray-600">{event.userId}</td>
                <td className="px-6 py-3 text-gray-400">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <p className="text-center text-gray-400 py-12">No events yet</p>
        )}
      </div>

    </main>
  );
}

// displays a single stat card with a label, value and color
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${colors[color]?.split(" ")[1]}`}>{value}</p>
    </div>
  );
}

// displays a colored badge based on the event type
function EventBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    trip_started: "bg-blue-100 text-blue-700",
    trip_completed: "bg-green-100 text-green-700",
    booking_made: "bg-purple-100 text-purple-700",
    cancellation: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type]}`}>
      {type.replace(/_/g, " ")}
    </span>
  );
}