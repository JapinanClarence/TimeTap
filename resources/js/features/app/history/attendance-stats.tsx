import { Progress } from "@/components/ui/progress";

export default function AttendanceStats({ rate }: { rate: number }) {
    // Determine color based on thresholds
    const getStatusColor = (value: number) => {
        if (value >= 100) return "text-green-500 bg-green-500";
        if (value >= 50) return "text-orange-500 bg-orange-500";
        return "text-red-500 bg-red-500";
    };

    const statusClasses = getStatusColor(rate).split(" ");
    const textColor = statusClasses[0]; // e.g., text-green-500
    const bgColor = statusClasses[1];   // e.g., bg-green-500

    return (
        <div className=" bg-white p-4 rounded-xl border shadow-xs animate-fade-up-1">
            <div className="text-xs font-semibold flex justify-between mb-2">
                <p className="text-muted-foreground">Attendance Rate</p>
                <p className={textColor}>
                    {rate}%
                </p>
            </div>

            <Progress 
                indicatorClass={bgColor} 
                className="bg-gray-100 h-2" 
                value={rate} 
            />
            
            <div className="text-[10px] font-medium mt-2 text-muted-foreground">
                {rate === 100 ? (
                    "Perfect attendance! Keep it up."
                ) : rate >= 50 ? (
                    "Good progress, aim for 100%."
                ) : (
                    "Attendance is low. Try to attend more events."
                )}
            </div>
        </div>
    );
}