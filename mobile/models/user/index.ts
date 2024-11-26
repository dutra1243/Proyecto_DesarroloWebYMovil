export interface UserDto {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
    friends: string[];
    createdAt: Date;

}

export interface AuthUser {
    username: string;
    email: string;
    profilePicture: string;
    createdAt: Date;
    _id: string;
}