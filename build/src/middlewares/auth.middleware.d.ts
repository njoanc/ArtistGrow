import { NextFunction, Request, Response } from "express";
import { JWTUtils } from "../utils/jwt-utils";
export declare class UsersMiddleware {
    private jwtUtils;
    constructor(jwtUtils: JWTUtils);
    /**
     * @function
     * @param req
     * @param res
     * @param next
     */
    validateSession(excludedRoutes?: string[]): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=auth.middleware.d.ts.map