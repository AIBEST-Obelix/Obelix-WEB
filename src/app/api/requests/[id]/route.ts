import { NextRequest, NextResponse } from "next/server";
import apiHttpClient from "@/lib/api/http";
import { cookies } from "next/headers";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const response = await apiHttpClient.get(`/api/requests/Request/${params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error fetching request:", error);
        return NextResponse.json(
            { error: "Failed to fetch request" },
            { status: error.response?.status || 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        const response = await apiHttpClient.put(`/api/requests/Request/${params.id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error updating request:", error);
        return NextResponse.json(
            { error: "Failed to update request" },
            { status: error.response?.status || 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const response = await apiHttpClient.delete(`/api/requests/Request/${params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error deleting request:", error);
        return NextResponse.json(
            { error: "Failed to delete request" },
            { status: error.response?.status || 500 }
        );
    }
}
