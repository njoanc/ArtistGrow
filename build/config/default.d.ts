export declare const config: {
    server: {
        port: number;
    };
    db: {
        host: string;
        type: string;
        synchronize: string;
        entities: string[];
        username: string | undefined;
        password: string | undefined;
        database: string | undefined;
    };
    logger: {
        level: string;
    };
    smtp: {
        host: string | undefined;
        auth: {
            user: string | undefined;
            pass: string | undefined;
        };
    };
    jwtSecretKey: string;
};
//# sourceMappingURL=default.d.ts.map