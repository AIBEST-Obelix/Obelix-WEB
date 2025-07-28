import { NextRequest, NextResponse } from "next/server";
import apiHttpClient from "@/lib/api/http";
import { cookies } from "next/headers";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const response = await apiHttpClient.patch(`/api/requests/Request/${params.id}/approve`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error approving request:", error);
        return NextResponse.json(
            { error: "Failed to approve request" },
            { status: error.response?.status || 500 }
        );
    }
}
