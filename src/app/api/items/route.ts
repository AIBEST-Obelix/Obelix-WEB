import { NextRequest, NextResponse } from "next/server";
import { ItemVm } from "@/lib/api/models/item/item-vm";
import itemApi from "@/lib/api/apis/identity/item-api";

export async function GET(): Promise<NextResponse<Array<ItemVm> | unknown>> {
    try {
        const res = await itemApi.GetAllItemsAsync();

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
        const formData = await req.formData();

        const res = await itemApi.CreateItemAsync(formData) as any;

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
