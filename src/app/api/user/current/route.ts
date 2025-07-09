import {UserVm} from "@/lib/api/models/user/user-vm";
import {NextRequest, NextResponse} from "next/server";
import userApi from "@/lib/api/apis/identity/user-api";

export async function GET(req: NextRequest) : Promise<NextResponse<UserVm> | unknown>{
    try {
        const res = await userApi.GetCurrentUserInfoAsync();

        return NextResponse.json(res.data, {
            status: 200
        })
    }
    catch (error: any) {
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