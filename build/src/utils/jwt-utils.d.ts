export declare class JWTUtils {
    private jwtSecretKey;
    constructor();
    /**
     * @function
     * @name generate
     * @param userDetails
     * @returns
     */
    generate(userDetails: {
        name: string;
        email: string;
        id: number;
    }): string;
    /**
     * @function
     * @name verify
     * @param token
     * @param email
     */
    verify(token: string): {
        email: string;
        name: string;
        id: number;
    };
}
//# sourceMappingURL=jwt-utils.d.ts.map