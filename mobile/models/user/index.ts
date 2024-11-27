export interface UserDto {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    createdAt: Date;
}

export interface AuthUser {
    username: string;
    email: string;
    profilePicture: string;
    createdAt: Date;
}

export interface StateUser {
    _id: string;
    username: string;
    email: string;
}