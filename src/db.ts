import { Connection, createConnection } from 'mysql2'

export function connect(): Connection {
    const connection = createConnection({
        host:   '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'tasks_db',
    });
    return connection;
}