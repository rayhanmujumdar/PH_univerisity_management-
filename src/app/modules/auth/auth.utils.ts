import jwt, { JwtPayload } from "jsonwebtoken";
export const jwtTokenGenerator = (
    payload: JwtPayload,
    secretKey: string,
    expiresIn: string,
) => {
    return jwt.sign(payload, secretKey, {
        expiresIn,
    });
};
