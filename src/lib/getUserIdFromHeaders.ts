import { Request } from "express";

const getUserIdFromHeaders = (req: Request) => {
    const authHeader = req.headers.authorization;
    const userId = authHeader && authHeader.split(' ')[1];

    return userId;
}

export default getUserIdFromHeaders;
