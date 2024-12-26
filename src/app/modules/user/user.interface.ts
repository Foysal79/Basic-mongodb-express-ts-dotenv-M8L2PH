
export type TUser = {
    id : string;
    password : string;
    needPasswordChange : boolean;
    role : 'admin' | 'student' | 'faculty';
    isDeleted : boolean;
    status : 'in-Progress' | 'blocked';
}

export type NewUser = {
    role : string;
    password?: string;
    id : string;
}