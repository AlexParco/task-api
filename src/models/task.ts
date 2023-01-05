import {RowDataPacket} from 'mysql2'

export default interface Task extends RowDataPacket {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    expired_at: Date
}