export type Role = 'CITIZEN' | 'ADMIN'


export interface AuthUser {
    id : string;
    name : string;
    email : string;
    role : Role[];
}
