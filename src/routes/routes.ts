import { Application, Request, Response } from "express";

export default class Routes {
    constructor(app: Application){
        app.use("/api/v1/test", (req: Request, res:Response) => {
            res.send({
                "hola": "mundo"
            })
        })
    }
}