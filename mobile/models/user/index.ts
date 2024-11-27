export interface UserDto {
    username: string;
    email: string;
    description: string;
    password: string;
    profilePicture: string;
    createdAt: Date;
    friends: string[];
    _id: string;

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