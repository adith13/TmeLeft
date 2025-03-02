import { calculateProgress, calculateDaysBetween } from "@/utils";

interface EventCardProps {
    name: string;
    date: string;
    createdAt: string;
}

export default function EventCard({ name, date, createdAt }: EventCardProps) {
    const progress = calculateProgress(createdAt, date);
    const daysLeft = calculateDaysBetween(new Date().toISOString(), date);

    return (
        <div className="flex flex-col gap-3 bg-sf-secondary p-4 font-family-sans rounded-xl border border-st w-full max-w-md">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-tx-tertiary text-lg font-semibold">{name}</h2>

                <div className="flex flex-row gap-3 items-center justify-center">
                    <p className="text-tx font-bold uppercase text-sm">
                        {daysLeft <= 0 ? "Event Passed" : `${daysLeft} days left`}
                    </p>
                    <p className="text-tx-secondary text-sm">
                        {new Date(date).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <div className="w-full bg-sf-tertiary h-2 rounded-full overflow-hidden">
                <div
                    className="bg-st h-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}