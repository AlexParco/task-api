import { Connection, createConnection } from 'mysql2'

export function connect(): Connection {
    const connection = createConnection({
        host: 'localhost',
        user: 'root',
        database: 'tasks_db',
    });
    return connection;
}