import { Request, Response } from "express";
import TaskService from "../service/task.service";

export default class TaskController {
    service: TaskService 

    constructor() {
        this.service = new TaskService()
    }

     public getAllTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await this.service.findAll() 
            res.json(tasks)
        } catch (error) {
            res.sendStatus(404)
            res.json({Message: `Fetch all Tasks failed`})
        }
    }

    public getTask = async (req: Request, res: Response)  => {
        try {
            const id = req.params.id;
            const task = await this.service.findById(parseInt(id))
            res.json(task)
        } catch (error) {
            res.sendStatus(404)
            res.json({Message: `Task ${req.params.is} is failed`})
        }
    }

    public putTask = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const task = await this.service.update(req.body, parseInt(id))
            res.json(task)
        } catch (error) {
            res.sendStatus(404)
            res.json({Message: `update task ${req.params.id} failed`})
        }
    }

    public postTask = async (req: Request, res: Response)  => {
        try {
            const task = await this.service.save(req.body)

            res.json(task)
        } catch (error) {
            res.sendStatus(404)
            res.json({Message: `create task failed`})
        }
    }
    
    public deleteTask = async (req: Request, res:Response) => {
        try {
            await this.service.delete(parseInt(req.params.id))

            res.json({Message: `delete successfully`})
        } catch (error) {
            res.sendStatus(404)
            res.json({Message: `Task ${req.params.id} task failed`})
        }
    }
}