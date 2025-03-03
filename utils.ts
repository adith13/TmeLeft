export interface Event {
    id: string;
    name: string;
    date: string; // Target date (ISO string, e.g., "2025-12-31")
    createdAt: string; // Creation date (ISO string)
}

export const saveEvents = (events: Event[]) => {
    localStorage.setItem("events", JSON.stringify(events));
};

export const loadEvents = (): Event[] => {
    const data = localStorage.getItem("events");
    return data ? JSON.parse(data) : [];
};

export const calculateDaysBetween = (start: string, end: string): number => {
    const startDate = new Date(start).setHours(0, 0, 0, 0); // Normalize to midnight
    const endDate = new Date(end).setHours(0, 0, 0, 0);
    const diffMs = endDate - startDate;
    return Math.round(diffMs / (1000 * 60 * 60 * 24)); // Convert ms to days
};

export const calculateProgress = (targetDate: string): number => {
    const now = new Date().setHours(0, 0, 0, 0); // Today at midnight
    const target = new Date(targetDate).setHours(0, 0, 0, 0);

    // Define a fixed countdown period (e.g., 30 days before the event)
    const countdownDays = 30; // Adjust this as needed
    const start = target - countdownDays * 24 * 60 * 60 * 1000; // 30 days before target

    const totalDays = countdownDays; // Total duration of countdown
    const daysElapsed = Math.max(0, (now - start) / (1000 * 60 * 60 * 24)); // Days since start

    if (now >= target) return 100; // Event has passed
    if (now < start) return 0; // Too far in future (before countdown start)

    return Math.min(100, (daysElapsed / totalDays) * 100); // Percentage
};