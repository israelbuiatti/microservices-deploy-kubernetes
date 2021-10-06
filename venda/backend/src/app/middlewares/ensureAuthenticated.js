import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../exception/AppError";
import LogRepository from "../repository/LogRepository";

export default function ensureAuthenticated(request, response, next) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [type, token] = authHeader.split(' ');

    try {

        const decoded = verify(token, authConfig.jwt.secret);

        request.user = {
            uuid: decoded.sub,
            role: decoded.role,
            id_vendedor: decoded.id_vendedor
        }

        if (decoded.role.includes('ROLE_ADMIN')) {
            request.user.admin = true;
        }

        if (decoded.role.includes('ROLE_SUPERVISOR_D')) {
            request.user.id_vendedor = 'null';
            request.user.admin = true;
        }

        //LOG
        const log = {
            uuid_user: request.user.uuid,
            method: request.method,
            originalurl: request.originalUrl,
            body: request.body
        }

        const logRepository = new LogRepository();
        logRepository.insert(log);
        //--

        return next();
    } catch (error) {
        throw new AppError('Invalid JWT token', 401);
    }


}
