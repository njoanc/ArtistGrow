export declare class PasswordUtils {
    /**
     * @function
     * @name hashPassword
     * @param password
     * @returns
     */
    hashPassword(password: string): Promise<string>;
    /**
     * @function
     * @name comparePassword
     * @param password
     * @param hash
     * @returns
     */
    comparePassword(password: string, hash: string): boolean;
    /**
     * @function
     * @name generate
     * @param length
     * @returns
     */
    generate(length: number): string;
}
//# sourceMappingURL=password.utils.d.ts.map