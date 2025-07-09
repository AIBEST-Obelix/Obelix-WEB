import {NextRequest, NextResponse} from "next/server";
import {Validator} from "@/lib/validator/validator";
import {UserIm} from "@/lib/api/models/user/user-im";
import userApi from "@/lib/api/apis/identity/user-api";

export async function PUT(req: NextRequest, props: {params: Promise<{userId: string}>}) {
    const params = await props.params;
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
        Validator.ValidateUserUm(reqData);
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 400
        });
    }

    try {
        const res = await userApi.UpdateUserInfoAsync(params.userId, reqData) as any;

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

export async function DELETE(req: NextRequest, props: {params: Promise<{userId: string}>}) {
    const params = await props.params;
    try {
        const res = await userApi.DeleteUserAsync(params.userId) as any;
        
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