"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";


const chartConfig = {
    count: {
        label: "Check-ins",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export function AttendanceOverTime({
    data,
}: {
    data: {
        day: string;
        count: number;
    }[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Attendance Over Time</CardTitle>
                <CardDescription>
                    Daily check-in volume for the current week
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    className="aspect-auto h-62.5  w-full"
                    config={chartConfig}
                >
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="fillCount"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-count)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-count)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="count"
                            type="natural"
                            fill="url(#fillCount)"
                            stroke="var(--color-count)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this week{" "}
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Showing total scan distribution across all active
                            events
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
