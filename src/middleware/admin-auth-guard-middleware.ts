import {
    NextFetchEvent,
    NextRequest,
    NextResponse
} from "next/server";
import {MiddlewareFactory} from "@/middleware/middleware-factory";
import {jwtDecode} from "jwt-decode";

export const adminAuthGuardMiddleware: MiddlewareFactory = (next) => {
    return async(request: NextRequest, _next: NextFetchEvent) => {
        const pathname = request.nextUrl.pathname;

        if (pathname.startsWith("/admin")) {
            const accessToken = request.cookies.get("accessToken");
            if (!accessToken) {
                const url = new URL(`/auth/login`, request.nextUrl.origin);
                return NextResponse.redirect(url);
            }
            
            // decode token
            const decode = jwtDecode<CustomJwtToken>(accessToken.value);
            
            if (decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== 'Admin') {
                const url = new URL(`/`, request.nextUrl.origin);
                return NextResponse.redirect(url);
            }
        }
        
        return next(request, _next);
    };
};