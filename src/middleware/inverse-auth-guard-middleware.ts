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

export const inverseAuthGuardMiddleware: MiddlewareFactory = (next) => {
    return async(request: NextRequest, _next: NextFetchEvent) => {
        const pathname = request.nextUrl.pathname;
        
        // Make sure this is the last middleware in this file
        if (["/auth/login"]?.some((path) => pathname == path)) {
            const accessToken = request.cookies.get("accessToken");
            
            if (!accessToken) {
                return next(request, _next);
            }
            
            const decode = jwtDecode<CustomJwtToken>(accessToken.value);
            
            let url = new URL(`/`,  request.nextUrl.origin);
            
            if (decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Admin') {
                url = new URL(`/admin`,  request.nextUrl.origin);
            }
            
            return NextResponse.redirect(url);
        }
        return next(request, _next);
    };
};