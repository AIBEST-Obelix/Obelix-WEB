import {
    NextFetchEvent,
    NextRequest,
    NextResponse
} from "next/server";
import {MiddlewareFactory} from "@/middleware/middleware-factory";
import {jwtDecode} from "jwt-decode";

function getSearchParam(param: string, url: any) {
    return url.searchParams.get(param);
}

export const adminAuthGuardMiddleware: MiddlewareFactory = (next) => {
    return async(request: NextRequest, _next: NextFetchEvent) => {
        const pathname = request.nextUrl.pathname;

        if (["/admin", "/admin/admin", "/admin/company", "/admin/user", "/admin/product", "/admin/notification"]?.some((path) => pathname === path)
            || ["/admin/company/"]?.some((path) => pathname.startsWith(path))) {
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