export type EventType = {
    title: string;
    description?: string;
    location: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    status?: "active" | "inactive";
    coordinates?: {
        long: number;
        lat: number;
    }[];
    id? :number;
};
