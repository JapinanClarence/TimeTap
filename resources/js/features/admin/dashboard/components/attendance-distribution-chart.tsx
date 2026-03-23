"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
import { TrendingUp } from "lucide-react";

const distributionData = [
    { method: "user_scan", count: 1240, fill: "var(--color-user_scan)" },
    { method: "admin_scan", count: 310, fill: "var(--color-admin_scan)" },
];

const distributionConfig = {
    count: {
        label: "Total Scans",
    },
    user_scan: {
        label: "User Scan",
        color: "var(--primary)",
    },
    admin_scan: {
        label: "Admin Scan",
        color: "var(--secondary)",
    },
} satisfies ChartConfig;

export function AttendanceDistribution() {
    const totalScans = React.useMemo(() => {
        return distributionData.reduce((acc, curr) => acc + curr.count, 0);
    }, []);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Scan Distribution</CardTitle>
                <CardDescription>Admin vs User initiated scans</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={distributionConfig}
                    className=" aspect-auto h-62.5 "
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={distributionData}
                            dataKey="count"
                            nameKey="method"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalScans.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground text-xs"
                                                >
                                                    Total Scans
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
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
                            Total scans recorded across all organizations
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
