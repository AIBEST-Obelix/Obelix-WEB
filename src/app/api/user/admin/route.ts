import {NextResponse} from "next/server";
import {UserVm} from "@/lib/api/models/user/user-vm";
import userApi from "@/lib/api/apis/identity/user-api";

export async function GET() : Promise<NextResponse<Array<UserVm> | unknown>>{
    try {
        const res = await userApi.GetAllAdminsAsync();

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