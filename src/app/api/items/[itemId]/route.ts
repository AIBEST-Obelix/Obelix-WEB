import { NextRequest, NextResponse } from "next/server";
import { ItemVm } from "@/lib/api/models/item/item-vm";
import { ItemUm } from "@/lib/api/models/item/item-um";
import itemApi from "@/lib/api/apis/identity/item-api";
import { Validator } from "@/lib/validator/validator";

export async function GET(req: NextRequest, props: { params: Promise<{ itemId: string }> }): Promise<NextResponse<ItemVm | unknown>> {
    const params = await props.params;

    try {
        const res = await itemApi.GetItemByIdAsync(params.itemId);

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

export async function PUT(req: NextRequest, props: { params: Promise<{ itemId: string }> }): Promise<NextResponse<unknown>> {
    const params = await props.params;
    let reqData = {} as ItemUm;

    try {
        reqData = await req.json();
    } catch (error) {
        return NextResponse.json({
            error: 'Invalid JSON.'
        }, {
            status: 400
        });
    }

    try {
        // Add validation here if needed
        // Validator.ValidateItemUm(reqData);

        const res = await itemApi.UpdateItemAsync(params.itemId, reqData) as any;

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

export async function DELETE(req: NextRequest, props: { params: Promise<{ itemId: string }> }): Promise<NextResponse<unknown>> {
    const params = await props.params;

    try {
        const res = await itemApi.DeleteItemAsync(params.itemId) as any;

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
