import { NextRequest, NextResponse } from "next/server";
import apiHttpClient from "@/lib/api/http";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            console.log("No access token found");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log("Fetching requests from backend...");
        const response = await apiHttpClient.get("/api/requests/Request", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Backend response:", response.status, response.data);

        // Ensure we return an array even if backend returns null/undefined
        const data = Array.isArray(response.data) ? response.data : [];
        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "Error fetching requests:",
            error.response?.status,
            error.response?.data,
            error.message
        );

        // If it's a 404, return empty array instead of error
        if (error.response?.status === 404) {
            console.log("Requests endpoint not found, returning empty array");
            return NextResponse.json([]);
        }

        return NextResponse.json(
            { error: "Failed to fetch requests" },
            { status: error.response?.status || 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        const response = await apiHttpClient.post("/api/requests/Request", body, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error creating request:", error);
        return NextResponse.json(
            { error: "Failed to create request" },
            { status: error.response?.status || 500 }
        );
    }
}
