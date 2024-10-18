export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    _id: string;
    username: string;
    email: string;
    token: string;
}