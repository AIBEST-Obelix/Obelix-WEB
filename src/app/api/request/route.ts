import { NextRequest, NextResponse } from "next/server";
import { RequestVm } from "@/lib/api/models/request/request-vm";
import requestApi from "@/lib/api/apis/identity/request-api";

export async function GET(): Promise<NextResponse<Array<RequestVm> | unknown>> {
    try {
        const res = await requestApi.GetAllRequestsAsync();

        return NextResponse.json(res.data, {
            status: 200
        });
    } catch (error: any) {
        const errorMsg =
            error?.response?.data?.title ??
            error?.response?.data?.message ??
            error?.message ??
            "An unexpected error occurred.";

        const statusCode = error?.response?.status ?? 500;

        return NextResponse.json(
            {
                error: errorMsg,
            },
            {
                status: statusCode,
            }
        );
    }
}

export async function POST(req: NextRequest): Promise<NextResponse<unknown>> {
    try {
        const body = await req.json();

        const res = await requestApi.CreateRequestAsync(body);

        return NextResponse.json(res.data, {
            status: 200
        });
    } catch (error: any) {
        const errorMsg =
            error?.response?.data?.title ??
            error?.response?.data?.message ??
            error?.message ??
            "An unexpected error occurred.";

        const statusCode = error?.response?.status ?? 500;

        return NextResponse.json(
            {
                error: errorMsg,
            },
            {
                status: statusCode,
            }
        );
    }
} 