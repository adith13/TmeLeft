"use client";

import { useState, useEffect } from "react";
import EventCard from "./components/EventCard";
import { Event, saveEvents, loadEvents } from "@/utils";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false); // Toggle form visibility

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date) return;
    const newEvent: Event = {
      id: crypto.randomUUID(),
      name,
      date: new Date(date).toISOString(),
      createdAt: new Date().toISOString(),
    };
    setEvents([...events, newEvent]);
    setName("");
    setDate("");
    setIsFormOpen(false); // Close form after adding
  };

  return (
    <main className="min-h-screen p-4 font-family-sans flex flex-col gap-6">
      {/* Top Navbar */}
      <nav className="bg-sf-secondary w-full p-4 flex flex-col gap-5 justify-center items-center fixed top-0 left-0 z-10 border-b border-st">
        <div className="w-full max-w-md mx-auto flex justify-between items-center">

          <h1 className="text-tx text-2xl font-bold">Time Left</h1>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-sf text-tx-tertiary p-4 py-2 hover:bg-sf-secondary border border-st rounded-full"
          >
            {isFormOpen ? "Cancel" : "Add Event"}
          </button>
        </div>

        {/* Form (expands below navbar when open) */}
        <div
          className={`w-full max-w-md bg-sf p-3 flex flex-col gap-4 rounded-4xl border border-st
            transition-all duration-300 ease-in-out ${isFormOpen ? "block" : 
            "hidden"
            }`}
        >
          <form onSubmit={addEvent} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-sf-secondary text-tx p-5 py-2.5 rounded-full border border-st focus:outline-none focus:border-st-secondary"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-sf-secondary text-tx p-5 py-2.5 rounded-full border border-st focus:outline-none focus:border-st-secondary"
            />
            <button
              type="submit"
              className="w-full bg-sf-tertiary text-tx-tertiary  p-5 py-2.5 rounded-full border border-st hover:bg-sf-secondary transition-colors"
            >
              Add Event
            </button>
          </form>
        </div>
      </nav>



      {/* Event List */}
      <div className="flex flex-col gap-4 w-full items-center mt-24"> {/* Margin to avoid overlap with fixed navbar */}
        {events.length === 0 ? (
          <p className="text-tx-secondary">No events yet. Add one above!</p>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              name={event.name}
              date={event.date}
              createdAt={event.createdAt}
            />
          ))
        )}
      </div>
    </main>
  );
}