import { NextFunction, Request, Response } from "express";

type configType = {
    limits: {[key: string]: number}
    maxRequest: number
}

const config: configType = {
    limits: {},
    maxRequest: 30
}

setInterval(() => {
    config.limits = {};
}, 30000);

export const limits = (req: Request, res: Response, next: NextFunction) => {
    var ips = req.headers['x-forwarded-for'] || req.socket.remoteAddress ;
    if(ips === undefined) return next();

    let ip = (Array.isArray(ips) && ips[0]) ? ips[0] : ips as string

    config.limits[ip] = config.limits[ip] ?? 0;

    config.limits[ip]++;

    if(config.limits[ip] > config.maxRequest){
        return res.status(429).send("max request");
    }
    
    next();
}