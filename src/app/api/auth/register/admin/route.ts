import {NextRequest, NextResponse} from "next/server";
import {UserIm} from "@/lib/api/models/user/user-im";
import {Validator} from "@/lib/validator/validator";
import authApi from "@/lib/api/apis/identity/auth-api";

export async function POST(req: NextRequest) {
    let reqData = {} as UserIm;

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
        Validator.ValidateUserIm(reqData);
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 400
        });
    }

    try {
        const res = await authApi.CreateAdminAsync(reqData) as any;

        return NextResponse.json(res.data, {
            status: 200
        })
    }
    catch (error: any) {
        const errorMsg = error.response.data.title ?? error.response.data.message;

        return NextResponse.json({
            error: errorMsg
        }, {
            status: error.response.status
        });
    }
}