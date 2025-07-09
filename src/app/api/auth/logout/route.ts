import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    (await cookies()).delete('accessToken');
    (await cookies()).delete('refreshToken');
    (await cookies()).delete('provider');

    return NextResponse.json({
        message: 'Successfully logged out.'
    }, {
        status: 200
    });
}