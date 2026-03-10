import { EventType } from "@/types/event";
import { formatSimpleDate, formatTime12h } from "@/util/dateUtil";
import { Calendar, ChevronUp, Clock, MapPin } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";

interface EventDetailProps {
    data: EventType;
}

export default function EventDetailSheet({ data }: EventDetailProps) {
    const drawerRef = useRef<HTMLDivElement>(null);
    const dragStartY = useRef<number>(0);
    const dragStartTranslate = useRef<number>(0);
    const [translateY, setTranslateY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // The max drag-down offset = 90% of drawer height (so only the top 10% — the header — remains visible)
    const getMaxDrag = useCallback(() => {
        if (!drawerRef.current) return 0;
        return drawerRef.current.offsetHeight * 0.9;
    }, []);

    const onDragStart = useCallback(
        (clientY: number) => {
            setIsDragging(true);
            dragStartY.current = clientY;
            dragStartTranslate.current = translateY;
        },
        [translateY],
    );

    const onDragMove = useCallback(
        (clientY: number) => {
            if (!isDragging) return;
            const delta = clientY - dragStartY.current;
            const next = dragStartTranslate.current + delta;
            // Clamp: can't go above original position (0) or below maxDrag
            const clamped = Math.min(Math.max(next, 0), getMaxDrag());
            setTranslateY(clamped);
        },
        [isDragging, getMaxDrag],
    );

    const onDragEnd = useCallback(() => {
        if (!isDragging) return;
        setIsDragging(false);
        const max = getMaxDrag();
        // Snap: if dragged past 45% of max, snap to collapsed (90% hidden); otherwise snap open
        if (translateY > max * 0.45) {
            setTranslateY(max);
        } else {
            setTranslateY(0);
        }
    }, [isDragging, translateY, getMaxDrag]);

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        onDragStart(e.clientY);
    };
    useEffect(() => {
        if (!isDragging) return;
        const move = (e: MouseEvent) => onDragMove(e.clientY);
        const up = () => onDragEnd();
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
        };
    }, [isDragging, onDragMove, onDragEnd]);

    // Touch events
    const handleTouchStart = (e: React.TouchEvent) => {
        // Don't prevent default here — let the useEffect handler do it
        onDragStart(e.touches[0].clientY);
    };
    useEffect(() => {
        if (!isDragging) return;
        const move = (e: TouchEvent) => {
            e.preventDefault(); // Prevents page scroll while dragging
            onDragMove(e.touches[0].clientY);
        };
        const up = () => onDragEnd();
        // passive: false required to allow preventDefault on touchmove
        window.addEventListener("touchmove", move, { passive: false });
        window.addEventListener("touchend", up);
        return () => {
            window.removeEventListener("touchmove", move);
            window.removeEventListener("touchend", up);
        };
    }, [isDragging, onDragMove, onDragEnd]);

    const isCollapsed = translateY > getMaxDrag() * 0.45;

    return (
        <>
            <div
                ref={drawerRef}
                style={{
                    transform: `translateY(${translateY}px)`,
                    transition: isDragging
                        ? "none"
                        : "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
                    willChange: "transform",
                }}
                className="absolute md:hidden z-50 bottom-0 left-0 right-0 bg-white border border-border shadow-2xl rounded-tl-4xl rounded-tr-4xl select-none"
            >
                {/* Expand button — only visible when collapsed */}
                {isCollapsed && (
                    <div className="animate-slide-fade-up  absolute -top-10 w-full flex justify-center pointer-events-none">
                        <button
                            className="pointer-events-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium shadow-lg"
                            onMouseDown={(e) => e.stopPropagation()}
                            onTouchStart={(e) => e.stopPropagation()}
                            onClick={() => setTranslateY(0)}
                        >
                            <ChevronUp className="w-3.5 h-3.5" />
                            View Details
                        </button>
                    </div>
                )}
                {/* Drag handle + header — always visible */}
                <div
                    className="cursor-grab active:cursor-grabbing pt-3 pb-2 px-4"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                >
                    <div className="w-25 h-1.5 bg-muted rounded-full mx-auto mb-3" />
                    <div className="flex items-center justify-center">
                        <h1 className="text-lg font-semibold">Event Details</h1>
                    </div>
                </div>

                {/* Scrollable content */}
                <div className="px-8 pb-8 pt-1 space-y-4">
                    {/* Title + description */}
                    <div>
                        <h2 className="text-xl font-bold">{data.title}</h2>
                        {data.description && (
                            <p className="text-md text-pretty text-muted-foreground mt-1">
                                {data.description}
                            </p>
                        )}
                    </div>

                    <div className="h-px bg-border" />

                    {/* Meta info */}
                    <div className="space-y-3">
                        {data.location && (
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 p-1.5 rounded-full bg-primary/10">
                                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                                </span>
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase">
                                        Location
                                    </p>
                                    <p className="text-sm font-medium">
                                        {data.location}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-start gap-3">
                            <span className="mt-0.5 p-1.5 rounded-full bg-primary/10">
                                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                            </span>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase">
                                    Date
                                </p>
                                <p className="text-sm font-medium">
                                    {formatSimpleDate(data.start_date)}
                                    {data.start_date !== data.end_date && (
                                        <>
                                            {" "}
                                            &ndash;{" "}
                                            {formatSimpleDate(data.end_date)}
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="mt-0.5 p-1.5 rounded-full bg-primary/10">
                                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                            </span>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase">
                                    Time
                                </p>
                                <p className="text-sm font-medium">
                                    {formatTime12h(data.start_time)} &ndash;{" "}
                                    {formatTime12h(data.end_time)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
