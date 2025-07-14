import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import {getMiddleware, TokenPair} from "with-refresh-token";
import {jwtDecode} from "jwt-decode";
import apiHttpClient from "@/lib/api/http";
import {MiddlewareFactory} from "@/middleware/middleware-factory";

const DEFAULT_OFFSET_SECONDS = 15; // refresh the token 15 seconds before it expires

export const withRefreshToken = getMiddleware({
    // get the jwt access token from the cookies through the original request
    // and check if it is expired
    shouldRefresh: (req) => {
        const accessToken = req.cookies.get("accessToken")?.value;
        if (!accessToken) {
            return false; // user is not logged in but may have a refresh token
        }
        
        try {
            const exp = jwtDecode(accessToken).exp; // decode the jwt and get the expiration time
            
            if (!exp) return false; // token does not have an expiration time
            
            return exp - DEFAULT_OFFSET_SECONDS <= Date.now() / 1000; // check if the token is expired
        } catch {
            return true; // invalid token but a refresh token may be available
        }
    },
    fetchTokenPair: async (req) => {
        // if true is returned from shouldRefresh, this function will be called
        // do whatever you need to get the new token pair
        const refreshToken = req.cookies.get("refreshToken")?.value;
        const accessToken = req.cookies.get("accessToken")?.value;
        
        if (!refreshToken) {
            // this error is caught by the onError function or ignored if not provided, following
            // the middleware flow normally
            throw new Error("Refresh token not found");
        }
        
        const tokens = {
            refreshToken: refreshToken,
            accessToken: accessToken,
        };
        
        const renewPath= "api/identity/auth/renew"
        
        const response = await  apiHttpClient.post(renewPath, tokens);
        
        const tokenPair = {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
        } as TokenPair;

        return tokenPair; // `TokenPair` object should be returned
    },
    onSuccess: async (res, tokenPair) => {
        // with the new token pair, set the new access token and refresh token to the cookies
        // so that the middleware and Server Components can use the new token to make auth requests
        res.cookies.set({
            name: "accessToken",
            value: tokenPair.accessToken,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
            httpOnly: true,
        });
        res.cookies.set({
            name: "refreshToken",
            value: tokenPair.refreshToken,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
            httpOnly: true,
        });
    },
    // @ts-ignore
    onError: (_req) => {
        // optional function that is called when an error occurs during the refresh token process
        // you can clear the cookies and redirect to the login page if is unauthorized
        // if (error instanceof Response && error.status === 401) {
        //   res.cookies.set({ name: "access-token", value: "", maxAge: 0, path: "/" });
        //   res.cookies.set({ name: "refresh-token", value: "", maxAge: 0, path: "/" });
        //   return NextResponse.redirect(new URL("/login", req.url));
        // }
        const accessToken = _req.cookies.get("accessToken")?.value;
        
        if (!accessToken) {
            const response = NextResponse.redirect(new URL("/auth/login", _req.nextUrl.origin));

            response.cookies.delete("accessToken");
            response.cookies.delete("refreshToken");
            response.cookies.delete("providerId");
            
            return response;
        }
        
        const decoded = jwtDecode<CustomJwtToken>(accessToken);
        
        if (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Admin')
        {
            const response = NextResponse.redirect(new URL("/auth/login", _req.nextUrl.origin));

            response.cookies.delete("accessToken");
            response.cookies.delete("refreshToken");
            
            return response;
        } else {
            const response = NextResponse.redirect(new URL("/auth/login",  _req.nextUrl.origin));

            response.cookies.delete("accessToken");
            response.cookies.delete("refreshToken");
            response.cookies.delete("providerId");

            return response;
        }
    },
});

export const refreshTokenMiddleware: MiddlewareFactory = () => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        const pathname = request.nextUrl.pathname;
        
        if (["/admin", "/admin/user", "/"]?.some((path) => pathname === path)) {
            // @ts-ignore
            return withRefreshToken()(request, _next);
        }
    }
};

