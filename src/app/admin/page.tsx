"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
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
        { name: "Admins", value: admins.length, fill: "hsl(var(--chart-2))" },
        { name: "Items", value: items.length, fill: "hsl(var(--chart-3))" }
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

            {/* Beautiful Chart */}
            <div className="flex justify-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle>System Overview</CardTitle>
                        <CardDescription>Visual representation of your data</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 px-12 py-6">
                            <ChartContainer config={chartConfig}>
                                <BarChart data={chartData} margin={{ top: 30, right: 40, left: 30, bottom: 20 }}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
