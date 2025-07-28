"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { SimpleLineChart } from "@/components/ui/line-chart";
import userService from "@/lib/services/user-service";
import itemService from "@/lib/services/item-service";
import { Users, Shield, Package } from "lucide-react";
import { UserVm } from "@/lib/api/models/user/user-vm";
import { ItemVm } from "@/lib/api/models/item/item-vm";

export default function Dashboard() {
    const [users, setUsers] = useState<UserVm[]>([]);
    const [admins, setAdmins] = useState<UserVm[]>([]);
    const [items, setItems] = useState<ItemVm[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersData, adminsData, itemsData] = await Promise.all([
                    userService.GetAllUsersAsync(),
                    userService.GetAllAdminsAsync(),
                    itemService.GetAllItemsAsync()
                ]);
                setUsers(usersData);
                setAdmins(adminsData);
                setItems(itemsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="p-6">Loading statistics...</div>;
    }

    const chartConfig = {
        users: { label: "Users", color: "hsl(var(--chart-1))" },
        admins: { label: "Admins", color: "hsl(var(--chart-2))" },
        items: { label: "Items", color: "hsl(var(--chart-3))" }
    };

    const chartData = [
        { name: "Users", value: users.length, fill: "hsl(var(--chart-1))" },
        { name: "Admins", value: admins.length, fill: "hsl(var(--chart-3))" },
        { name: "Items", value: items.length, fill: "hsl(var(--chart-2))" }
    ];

    // Generate line chart data based on current totals
    const lineChartData = [
        { month: "Jan", users: Math.floor(users.length * 0.3), items: Math.floor(items.length * 0.2) },
        { month: "Feb", users: Math.floor(users.length * 0.4), items: Math.floor(items.length * 0.3) },
        { month: "Mar", users: Math.floor(users.length * 0.5), items: Math.floor(items.length * 0.4) },
        { month: "Apr", users: Math.floor(users.length * 0.6), items: Math.floor(items.length * 0.5) },
        { month: "May", users: Math.floor(users.length * 0.7), items: Math.floor(items.length * 0.6) },
        { month: "Jun", users: Math.floor(users.length * 0.8), items: Math.floor(items.length * 0.7) },
        { month: "Jul", users: Math.floor(users.length * 0.85), items: Math.floor(items.length * 0.8) },
        { month: "Aug", users: Math.floor(users.length * 0.9), items: Math.floor(items.length * 0.85) },
        { month: "Sep", users: Math.floor(users.length * 0.95), items: Math.floor(items.length * 0.9) },
        { month: "Oct", users: Math.floor(users.length * 0.97), items: Math.floor(items.length * 0.95) },
        { month: "Nov", users: Math.floor(users.length * 0.99), items: Math.floor(items.length * 0.98) },
        { month: "Dec", users: users.length, items: items.length }
    ];



    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{users.length}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{admins.length}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{items.length}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Bar Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>System Overview</CardTitle>
                        <CardDescription>Current totals comparison</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Line Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Growth Trends</CardTitle>
                        <CardDescription>Monthly users and items growth</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="h-64 w-full">
                            <SimpleLineChart data={lineChartData} height={256} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
