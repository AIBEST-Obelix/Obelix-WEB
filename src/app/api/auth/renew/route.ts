import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {TokensIM} from "@/lib/api/models/token/token-im";
import {jwtDecode} from "jwt-decode";
import apiHttpClient from "@/lib/api/http";

export async function POST(req: NextRequest) : Promise<NextResponse>{
    const tokens = {
        accessToken: (await cookies()).get('accessToken')?.value,
        refreshToken: (await cookies()).get('refreshToken')?.value
    } as TokensIM
    
    let renewPath = "api/identity/auth/renew";
    
    const response = await apiHttpClient.post(renewPath, tokens)

    if (response.status !== 200) {
        return NextResponse.json({
            error: 'Token renewal failed.'
        }, {
            status: 400
        });
    }

    (await cookies()).set('accessToken', response.data.accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60
    });

    (await cookies()).set('refreshToken', response.data.refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60
    });

    return NextResponse.json(response.data, {
        status: 200
    })
}