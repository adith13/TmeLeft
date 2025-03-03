import { Event } from "./utils";

// Dummy events for development
export const dummyEvents: Event[] = [
    {
        id: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p",
        name: "Project Deadline",
        date: new Date("2025-03-15").toISOString(), // 12 days from now (Mar 3, 2025)
        createdAt: new Date("2025-03-01").toISOString(), // 2 days ago
    },
    {
        id: "2b3c4d5e-6f7g-8h9i-0j1k-l2m3n4o5p6",
        name: "Team Meeting",
        date: new Date("2025-03-07").toISOString(), // 4 days from now
        createdAt: new Date("2025-02-28").toISOString(), // 3 days ago
    },
    {
        id: "3c4d5e6f-7g8h-9i0j-1k2l-m3n4o5p6q7",
        name: "Vacation Start",
        date: new Date("2025-04-01").toISOString(), // 29 days from now
        createdAt: new Date("2025-03-02").toISOString(), // 1 day ago
    },
    {
        id: "4d5e6f7g-8h9i-0j1k-2l3m-n4o5p6q7r8",
        name: "Past Event",
        date: new Date("2025-02-25").toISOString(), // 6 days ago (passed)
        createdAt: new Date("2025-02-20").toISOString(), // 11 days ago
    },
    {
        id: "5e6f7g8h-9i0j-1k2l-3m4n-o5p6q7r8s9",
        name: "Birthday Party",
        date: new Date("2025-03-20").toISOString(), // 17 days from now
        createdAt: new Date("2025-02-25").toISOString(), // 6 days ago
    },
];

// Function to populate localStorage with dummy data
export const populateDummyData = () => {
    localStorage.setItem("events", JSON.stringify(dummyEvents));
};