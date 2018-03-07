import { User } from './User';

export interface AuthUser {
    token: string;
    id: number;
    username: string;
    role: string;
}
