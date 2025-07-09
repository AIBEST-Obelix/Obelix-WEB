import {
    stackMiddlewares
} from "@/middleware/stack-handler";
import {
    adminAuthGuardMiddleware
} from "@/middleware/admin-auth-guard-middleware";
import {
    inverseAuthGuardMiddleware
} from "@/middleware/inverse-auth-guard-middleware";
import {refreshTokenMiddleware} from "@/middleware/with-refresh-token";
import {elevatedPermissionAuthGuardMiddleware} from "@/middleware/elevated-permission-auth-guard-middleware";

const middlewares = [
    adminAuthGuardMiddleware,
    elevatedPermissionAuthGuardMiddleware,
    inverseAuthGuardMiddleware,
    refreshTokenMiddleware,
]
export default stackMiddlewares(middlewares);