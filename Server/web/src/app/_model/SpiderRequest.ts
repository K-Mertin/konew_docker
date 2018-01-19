import { User } from './User';

export interface SpiderRequest {
    _id: string;
    requestId: string;
    requestType: string;
    searchKeys: string[];
    referenceKeys?: string[];
    status: string;
    requester: User;
    createDate: Date;
}
