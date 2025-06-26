"use client";

import { useState, useEffect } from "react";
import EventCard from "./components/EventCard";
import { Event, saveEvents, loadEvents } from "@/utils";
import { dummyEvents, populateDummyData } from "@/data";

export default function Home() {
	const [events, setEvents] = useState<Event[]>([]);
	const [name, setName] = useState("");
	const [date, setDate] = useState("");
	const [isFormOpen, setIsFormOpen] = useState(false); // Toggle form visibility

	useEffect(() => {
		// Load existing events or populate with dummy data if empty (dev only)
		const storedEvents = loadEvents();
		if (storedEvents.length === 0 && process.env.NODE_ENV === "development") {
			populateDummyData();
			setEvents(dummyEvents);
		} else {
			setEvents(storedEvents);
		}
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
		<main className="flex flex-col gap-6 p-4 min-h-screen font-sans">
			{/* Top Navbar */}
			<nav className="top-0 left-0 z-10 fixed flex flex-col justify-center items-center gap-5 p-4 border-st border-b w-full bg-sf-secondary">
				<div className="flex justify-between items-center mx-auto w-full max-w-md">

					<h1 className="font-xanh text-tx text-2xl uppercase">Time Left</h1>
					<button
						onClick={() => setIsFormOpen(!isFormOpen)}
						className="p-4 py-2 border border-st bg-sf hover:bg-sf-secondary text-tx-tertiary"
					>
						{isFormOpen ? "Cancel" : "Add Event"}
					</button>
				</div>

				{/* Form (expands below navbar when open) */}
				<div
					className={`w-full max-w-md bg-sf p-3 flex flex-col gap-4  border border-st
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
							className="p-5 py-2.5 border border-st focus:border-st-secondary focus:outline-none w-full bg-sf-secondary text-tx"
						/>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="p-5 py-2.5 border border-st focus:border-st-secondary focus:outline-none w-full bg-sf-secondary text-tx"
						/>
						<button
							type="submit"
							className="p-5 py-2.5 border border-st w-full bg-sf-tertiary hover:bg-sf-secondary text-tx-tertiary transition-colors"
						>
							Add Event
						</button>
					</form>
				</div>
			</nav>


			<div className="flex flex-col items-center gap-4 mt-24 w-full">
				{events.length === 0 ? (
					<p className="text-tx-secondary">No events yet. Add one above!</p>
				) : (
					[...events] // Create a copy to avoid mutating the original array
						.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by date ascending
						.map((event) => (
							<EventCard
								key={event.id}
								name={event.name}
								date={event.date}
								createdAt={event.createdAt}
								onDelete={() => {
									const updatedEvents = events.filter((e) => e.id !== event.id);
									setEvents(updatedEvents);
								}}
							/>
						))
				)}
			</div>
		</main>
	);
}