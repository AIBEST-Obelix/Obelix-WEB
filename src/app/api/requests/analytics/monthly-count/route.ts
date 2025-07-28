import { NextRequest, NextResponse } from "next/server";
import apiHttpClient from "@/lib/api/http";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const response = await apiHttpClient.get("/api/requests/Request/analytics/monthly-count", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error fetching requests analytics:", error);
        return NextResponse.json(
            { error: "Failed to fetch requests analytics" },
            { status: error.response?.status || 500 }
        );
    }
}
