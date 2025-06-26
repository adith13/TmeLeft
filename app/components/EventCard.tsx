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
            className={`relative bg-sf-secondary font-xanh border overflow-hidden
                border-st w-full max-w-md cursor-pointer transition-all duration-300 
                `}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Single-line initial view */}
            <div className={`flex p-6 py-4 flex-row justify-between items-center ${isExpanded ? 'border-b' : ''} border-st`}
                style={{
                    background: `linear-gradient(to right, var(--color-white) ${progress}%, var(--color-black) ${progress}%)`,
                }}
            >
                <h2 className="text-white text-lg truncate mix-blend-difference">{name}</h2>
                <p className="text-white text-sm uppercase mix-blend-difference">
                    {daysLeft <= 0 ? "Event Passed" : `${daysLeft} days left`}
                </p>
            </div>

            {/* Expanded view */}
            {isExpanded && (
                <div className="flex flex-row justify-between items-center gap-2 p-6 py-4 font--sans font-medium">
                    <div className="flex flex-row justify-center items-center gap-2 text-white text-base">
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
                            className="flex justify-center items-center w-6 h-6 text-white cursor-pointer"
                        >
                            <Icon icon="mynaui:trash-solid" className="text-white text-3xl" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}