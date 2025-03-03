import { calculateProgress, calculateDaysBetween } from "@/utils";
import { useState } from "react";
import { Icon } from "@iconify/react";
interface EventCardProps {
    name: string;
    date: string;
    createdAt: string;
    onDelete?: () => void; // Optional delete callback
}

export default function EventCard({ name, date, createdAt, onDelete }: EventCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const progress = calculateProgress(date);
    const daysLeft = calculateDaysBetween(new Date().toISOString(), date);

    return (
        <div
            className={`relative bg-sf-secondary font-sans border
                overflow-hidden
                border-st w-full max-w-md cursor-pointer transition-all duration-300 ${isExpanded ? 'rounded-3xl' : 'rounded-full'}`}

            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Single-line initial view */}
            <div className={`flex p-6 py-4 flex-row justify-between items-center ${isExpanded ? 'border-b' : ''} border-st`}
                style={{
                    background: `linear-gradient(to right, var(--color-st) ${progress}%, var(--color-sf-secondary) ${progress}%)`,
                }}
            >
                <h2 className="text-tx-tertiary text-lg font-semibold truncate">{name}</h2>
                <p className="text-tx font-bold uppercase text-sm">
                    {daysLeft <= 0 ? "Event Passed" : `${daysLeft} days left`}
                </p>
            </div>

            {/* Expanded view */}
            {isExpanded && (
                <div className="p-6 py-4  flex flex-row items-center font-family-sans font-medium justify-between gap-2">
                    <div className="flex flex-row items-center text-tx-tertiary text-base justify-center gap-2">
                        <p>
                            {new Date(createdAt).toLocaleDateString()}
                        </p>
                        -
                        <p>
                            {new Date(date).toLocaleDateString()}
                        </p>
                    </div>
                    {onDelete && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card collapse on delete click
                                onDelete();
                            }}
                            className="text-tx-secondary hover:text-tx-tertiary w-6 h-6 flex items-center justify-center"
                        >
                            <Icon icon="mynaui:trash-solid" className="text-3xl text-tx" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}