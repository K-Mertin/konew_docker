export interface Party {
    name: string;
    idNumber: string;
    memo: any[];
    relationType: any[];
}

export interface Relation {
    _id: string;
    reason: string;
    subjects: Party[];
    objects: Party[];
    status: string;
    createDate: Date;
    createUser: string;
    modifyDate: Date;
    modifyUser: string;
}
