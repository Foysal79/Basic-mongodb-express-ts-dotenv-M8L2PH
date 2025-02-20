// export type TUser = {
//     id : string;
//     password : string;
//     needPasswordChange : boolean;
//     role : 'admin' | 'student' | 'faculty';
//     isDeleted : boolean;
//     status : 'in-Progress' | 'blocked';
// }

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  isDeleted: boolean;
  status: 'in-Progress' | 'blocked';
};
