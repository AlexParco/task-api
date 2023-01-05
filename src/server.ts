import express, { Application, json, Request, Response, urlencoded } from 'express';
import Routes from './routes/routes';

const app: Application = express()

app.use("/", (_: Request, res: Response): void => {
    res.send("Hello World!")
});

export default class Server {

    constructor(app: Application){
        this.config(app);
        new Routes(app);  
    }

    public config(app: Application): void {
        app.use(urlencoded({
            extended: true
        }))
        app.use(json())
    }
   
}