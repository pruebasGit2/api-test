import express from "express";

const app = express();

const maxRequest = 10;

let limits = {};

app.use((req, res, next) => {

    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 

    limits[ip] = limits[ip] ? limits[ip] + 1 : 1;

    if(limits[ip] > maxRequest){
        return res.status(429).send("max request");
    }
    
    next();
});

app.get("*", (_, res) => res.send("ok"));

setInterval(() => {
    console.log("reset limits");
    limits = {};
}, 30000);

app.listen(3000, "192.168.10.12");