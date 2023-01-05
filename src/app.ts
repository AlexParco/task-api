import express, { Application, } from "express";
import Server from "./server";

const PORT = 3001;

const app: Application = express()

// initialice server
new Server(app)

app.listen(PORT, 'localhost', () => {
    console.log(`Server running on http://localhost:${PORT}/api/v1`)

}).on('error', (err: Error) => {
    console.log(`server startup error: ${err.message}`)
})
