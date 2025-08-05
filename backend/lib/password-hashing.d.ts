export declare function hashPassword(plainTxtPw: string): Promise<string>;
export declare function validatePassword(plainTxtPw: string, hashedPw: string): Promise<boolean>;
