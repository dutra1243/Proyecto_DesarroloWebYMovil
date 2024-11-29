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

export interface SignUpRequest {
    username: string;
    email: string;
    password: string;
}

export interface SignUpResponse {
}