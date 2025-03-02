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

export const calculateProgress = (createdAt: string, targetDate: string): number => {
    const now = new Date().setHours(0, 0, 0, 0); // Today at midnight
    const created = new Date(createdAt).setHours(0, 0, 0, 0);
    const target = new Date(targetDate).setHours(0, 0, 0, 0);

    const totalDays = calculateDaysBetween(createdAt, targetDate); // Total days from creation to target
    const daysElapsed = calculateDaysBetween(createdAt, new Date().toISOString()); // Days from creation to now

    if (totalDays <= 0) return 0; // Invalid range (target before creation)
    if (now >= target) return 100; // Event has passed
    if (now < created) return 0; // Not yet started (shouldn’t happen)

    return Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100)); // Percentage
};