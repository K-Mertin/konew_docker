export interface Party {
    name: string;
    idNumber: string;
    memo: string;
}

export interface Relation {
    reason: string;
    subjects: Party[];
    objects: Party[];
    createDate: string;
    createUser: string;
    modifyDate: string;
    modifyUser: string;
}

 export const RELATIONS: Relation[] = [{
    reason: '違約',
    subjects: [{
        name: 'A借款人A',
        idNumber: 'A001',
        memo: '主要'
    }, {
        name: 'B借款人B',
        idNumber: 'A002',
        memo: '次要'
    }],
    objects: [{
        name: 'C關係人C',
        idNumber: 'AC001',
        memo: '同仁'
    }, {
        name: 'D關係人D',
        idNumber: 'D001',
        memo: '親友'
    }],
    createDate: '2017/01/01',
    createUser: 'test1',
    modifyDate: '2017/02/02',
    modifyUser: 'test2'
}, {
    reason: '高風險',
    subjects: [{
        name: 'E借款人E',
        idNumber: 'AE001',
        memo: '主要'
    }, {
        name: 'F借款人F',
        idNumber: 'F001',
        memo: '次要'
    }],
    objects: [{
        name: 'G關係人G',
        idNumber: 'AG001',
        memo: '同仁'
    }, {
        name: 'H關係人H',
        idNumber: 'AH001',
        memo: '親友'
    }],
    createDate: '2017/01/01',
    createUser: 'test1',
    modifyDate: '2017/02/02',
    modifyUser: 'test2'
}, {
    reason: '高風險',
    subjects: [{
        name: 'E借款人E',
        idNumber: 'AE001',
        memo: '主要'
    }, {
        name: 'F借款人F',
        idNumber: 'F001',
        memo: '次要'
    }],
    objects: [{
        name: 'G關係人G',
        idNumber: 'AG001',
        memo: '同仁'
    }, {
        name: 'H關係人H',
        idNumber: 'AH001',
        memo: '親友'
    }],
    createDate: '2017/01/01',
    createUser: 'test1',
    modifyDate: '2017/02/02',
    modifyUser: 'test2'
}];
