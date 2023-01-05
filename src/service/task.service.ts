import { Connection, OkPacket, QueryError } from 'mysql2'
import { connect } from '../db'
import Task from '../models/task'

export default class TaskService{
    conn: Connection

    constructor() {
        this.conn = connect()
    }

    findAll(): Promise<Task[]> {
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

    public findById(id: number): Promise<Task> {
        return new Promise((resolve, reject) => {
            this.conn.query<Task[]>(
                "SELECT * FROM tasks WHERE id=?",
                [id],
                (err: QueryError | null, res: Task[]) => {
                    err ? reject(err)
                    : resolve(res?.[0])
            })
        })
    }

    public save(task: Task): Promise<Task> {
        task.expired_at = new Date(task.expired_at)
        return new Promise((resolve, reject) => {
            this.conn.query<OkPacket>(
                "INSERT INTO tasks (name, description, expired_at) VALUES (?, ?, ? )",
                [task.name, task.description, task.expired_at],
                (err: QueryError | null, res: OkPacket) => {
                    err ? reject(err)
                    : this.findById(res.insertId)
                        .then(res => resolve(res))
                        .catch(err => reject(err))
            })
        })
    }

    public async update(task: Task, id: number): Promise<Task> {
        const taskLoad = await this.findById(id)
        task.created_at = taskLoad.created_at

        return new Promise((resolve, reject) => {
            this.conn.query<OkPacket>(
                "UPDATE tasks SET name=?, description=?, created_at=?, expired_at=? WHERE id=?",
                [task.name, task.description, task.created_at, task.expired_at, id],
                (err: QueryError | null , res: OkPacket) => {
                    err ? reject(err)
                    : this.findById(task.id)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
                }
            )
        })
    }

    public delete(id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            this.conn.query<OkPacket>(
                "DELETE FROM tasks WHERE id = ?",
                [id],
                (err: QueryError | null, res: OkPacket) => {
                    err ? reject(err)
                    : resolve(res.affectedRows)
            })
        })
    }
}