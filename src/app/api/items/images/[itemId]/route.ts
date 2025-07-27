import { NextRequest, NextResponse } from "next/server";
import itemApi from "@/lib/api/apis/identity/item-api";

export async function GET(req: NextRequest, props: { params: Promise<{ itemId: string }> }): Promise<NextResponse<Array<string> | unknown>> {
    const params = await props.params;

    try {
        const res = await itemApi.GetItemImageIdsAsync(params.itemId);

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
