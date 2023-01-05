import Task from '../models/task'
import {Connection, QueryError} from 'mysql2'

export default class TaskService{
    private conn: Connection

    constructor(conn: Connection) {
        this.conn = conn
    }

    public findAllTasks(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            this.conn.query<Task[]>(
                "SELECT * FROM tasks",
                (err: QueryError, res: Task[]) => {
                    err ? reject(err)
                    : resolve(res)
                }
            )
        })
    }

    public findTaskById(id: string): Promise<Task> {
        return new Promise((resolve, reject) => {
        this.conn.query<Task[]>(
            "SELECT * FROM tasks WHERE id = ?",
            [id],
            (err: QueryError | null, res: Task[]) => {
                err ? reject(err)
                : resolve(res?.[0])
            })
        })
    }

}