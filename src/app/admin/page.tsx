"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { SimpleLineChart } from "@/components/ui/line-chart";
import userService from "@/lib/services/user-service";
import itemService from "@/lib/services/item-service";
import clientHttpClient from "@/lib/services/client-http";
import { Users, Shield, Package, FileText } from "lucide-react";
import { UserVm } from "@/lib/api/models/user/user-vm";
import { ItemVm } from "@/lib/api/models/item/item-vm";

export default function Dashboard() {
    const [users, setUsers] = useState<UserVm[]>([]);
    const [admins, setAdmins] = useState<UserVm[]>([]);
    const [items, setItems] = useState<ItemVm[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
    const [userAnalytics, setUserAnalytics] = useState<Record<string, number>>({});
    const [itemAnalytics, setItemAnalytics] = useState<Record<string, number>>({});
    const [requestAnalytics, setRequestAnalytics] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersData, adminsData, itemsData, userAnalyticsRes, itemAnalyticsRes, requestAnalyticsRes] = await Promise.all([
                    userService.GetAllUsersAsync(),
                    userService.GetAllAdminsAsync(),
                    itemService.GetAllItemsAsync(),
                    clientHttpClient.get('/api/user/analytics/monthly-count'),
                    clientHttpClient.get('/api/items/analytics/monthly-count'),
                    clientHttpClient.get('/api/requests/analytics/monthly-count')
                ]);

                // Fetch requests data separately with error handling
                let requestsData = [];
                try {
                    requestsData = await clientHttpClient.get('/api/requests').then(res => res.data);
                } catch (requestError) {
                    console.warn("Failed to fetch requests data:", requestError);
                    // Continue without requests data
                }

                setUsers(usersData);
                setAdmins(adminsData);
                setItems(itemsData);
                setRequests(Array.isArray(requestsData) ? requestsData : []);
                setUserAnalytics(userAnalyticsRes.data);
                setItemAnalytics(itemAnalyticsRes.data);
                setRequestAnalytics(requestAnalyticsRes.data);
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
        items: { label: "Items", color: "hsl(var(--chart-3))" },
        requests: { label: "Requests", color: "hsl(var(--chart-4))" }
    };

    const chartData = [
        { name: "Users", value: users.length, fill: "hsl(var(--chart-1))" },
        { name: "Admins", value: admins.length, fill: "hsl(var(--chart-3))" },
        { name: "Items", value: items.length, fill: "hsl(var(--chart-2))" },
        { name: "Requests", value: requests.length, fill: "hsl(var(--chart-4))" }
    ];

    // Create line chart data from real analytics data
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const lineChartData = monthOrder.map(month => ({
        month,
        users: userAnalytics[month] || 0,
        items: itemAnalytics[month] || 0,
        requests: requestAnalytics[month] || 0
    }));


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

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{requests.length}</div>
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
                        <CardDescription>Monthly users, items, and requests growth</CardDescription>
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
