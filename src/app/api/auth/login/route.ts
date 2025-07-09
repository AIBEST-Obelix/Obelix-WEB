import {NextRequest, NextResponse} from "next/server";
import {UserIm} from "@/lib/api/models/user/user-im";
import {Validator} from "@/lib/validator/validator";
import authApi from "@/lib/api/apis/identity/auth-api";
import {cookies} from "next/headers";
import { AxiosError } from "axios";

export async function POST(req: NextRequest){
    let reqData = {} as UserIm;

    try {
        reqData = await req.json();
    } catch (error: unknown) {
        console.log(error);
        return NextResponse.json({
            error: 'Invalid JSON.'
        }, {
            status: 400
        });
    }

    try {
        Validator.ValidateUserIm(reqData);
    } catch (error: unknown) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 400
        });
    }

    try {
        const res = await authApi.LoginAsync(reqData as UserIm) as any;

        (await cookies()).set('accessToken', res.data.accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60
        });

        (await cookies()).set('refreshToken', res.data.refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60
        });

        return NextResponse.json(res.data, {
            status: 200
        })
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            const status = error.response?.status || 500;
            const errorMsg =
                error.response?.data?.title ||
                error.response?.data?.message ||
                error.message ||
                'Error connecting to authentication service';

            return NextResponse.json({ error: errorMsg }, { status });
        }

        return NextResponse.json({
            error: error instanceof Error ? error.message : 'An unexpected error occurred'
        }, {
            status: 500
        });
    }
}