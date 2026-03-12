import React from "react";

export const MiniMap = ({ isInRange = false }: { isInRange?: boolean }) => {
    if (!isInRange) {
        return (
            <div className="w-full h-24 rounded-xl overflow-hidden bg-amber-100 relative flex items-center justify-center mb-3">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 260 96"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <rect width="260" height="96" fill="#FEF3C7" />
                    {/* <!-- grid lines --> */}
                    <line
                        x1="0"
                        y1="32"
                        x2="260"
                        y2="32"
                        stroke="#FDE68A"
                        strokeWidth="1"
                    />
                    <line
                        x1="0"
                        y1="64"
                        x2="260"
                        y2="64"
                        stroke="#FDE68A"
                        strokeWidth="1"
                    />
                    <line
                        x1="65"
                        y1="0"
                        x2="65"
                        y2="96"
                        stroke="#FDE68A"
                        strokeWidth="1"
                    />
                    <line
                        x1="130"
                        y1="0"
                        x2="130"
                        y2="96"
                        stroke="#FDE68A"
                        strokeWidth="1"
                    />
                    <line
                        x1="195"
                        y1="0"
                        x2="195"
                        y2="96"
                        stroke="#FDE68A"
                        strokeWidth="1"
                    />
                    {/* <!-- roads --> */}
                    <line
                        x1="0"
                        y1="48"
                        x2="260"
                        y2="48"
                        stroke="#FCD34D"
                        strokeWidth="3"
                    />
                    <line
                        x1="100"
                        y1="0"
                        x2="100"
                        y2="96"
                        stroke="#FCD34D"
                        strokeWidth="3"
                    />
                    {/* <!-- destination pin --> */}
                    <circle
                        cx="140"
                        cy="50"
                        r="8"
                        fill="#2D5BE3"
                        opacity="0.2"
                    />
                    <circle cx="140" cy="50" r="4" fill="#2D5BE3" />
                    {/* <!-- current pin --> */}
                    <circle
                        cx="60"
                        cy="30"
                        r="8"
                        fill="#F59E0B"
                        opacity="0.25"
                    />
                    <circle cx="60" cy="30" r="4" fill="#D97706" />
                    {/* <!-- dashed line between --> */}
                    <line
                        x1="60"
                        y1="30"
                        x2="140"
                        y2="50"
                        stroke="#D97706"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                    />
                </svg>
            </div>
        );
    }
    return (
        <div className="w-full h-24 rounded-xl overflow-hidden bg-green-100 relative flex items-center justify-center mb-3">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 260 96"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* Background */}
                <rect width="260" height="96" fill="#DCFCE7" />{" "}
                {/* bg-green-100 */}
                {/* Grid lines (lighter green) */}
                <line
                    x1="0"
                    y1="32"
                    x2="260"
                    y2="32"
                    stroke="#BBF7D0"
                    strokeWidth="1"
                />
                <line
                    x1="0"
                    y1="64"
                    x2="260"
                    y2="64"
                    stroke="#BBF7D0"
                    strokeWidth="1"
                />
                <line
                    x1="65"
                    y1="0"
                    x2="65"
                    y2="96"
                    stroke="#BBF7D0"
                    strokeWidth="1"
                />
                <line
                    x1="130"
                    y1="0"
                    x2="130"
                    y2="96"
                    stroke="#BBF7D0"
                    strokeWidth="1"
                />
                <line
                    x1="195"
                    y1="0"
                    x2="195"
                    y2="96"
                    stroke="#BBF7D0"
                    strokeWidth="1"
                />
                {/* Roads (medium green) */}
                <line
                    x1="0"
                    y1="48"
                    x2="260"
                    y2="48"
                    stroke="#86EFAC"
                    strokeWidth="3"
                />
                <line
                    x1="100"
                    y1="0"
                    x2="100"
                    y2="96"
                    stroke="#86EFAC"
                    strokeWidth="3"
                />
                {/* Destination pin (Primary Green) */}
                <circle cx="140" cy="50" r="8" fill="#22C55E" opacity="0.2" />
                <circle cx="140" cy="50" r="4" fill="#15803D" />
                {/* Current pin (Bright Green) */}
                <circle cx="60" cy="30" r="8" fill="#22C55E" opacity="0.25" />
                <circle cx="60" cy="30" r="4" fill="#22C55E" />
                {/* Dashed line between (green-500) */}
                <line
                    x1="60"
                    y1="30"
                    x2="140"
                    y2="50"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                />
            </svg>
        </div>
    );
};
