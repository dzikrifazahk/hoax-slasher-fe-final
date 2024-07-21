export interface LoginResultI {
    token: string;
    user: UserLoginResultsI
}

export interface UserLoginResultsI {
    id: string;
    role: string;
    name: string;
}