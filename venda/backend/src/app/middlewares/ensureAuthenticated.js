import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../exception/AppError";

export default function ensureAuthenticated(request, response, next) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [type, token] = authHeader.split(' ');

    try {

        console.log('token', token);


        const decoded = verify(token, authConfig.jwt.secret);

        console.log(decoded);

        request.user = {
            uuid: decoded.sub,
            role: decoded.role[0],
            id_vendedor: decoded.id_vendedor
        }

        return next();
    } catch (error) {
        throw new AppError('Invalid JWT token', 401);
    }


}
