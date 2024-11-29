export interface UserDto {
    username: string;
    email: string;
    description: string;
    password: string;
    profilePicture: string;
    createdAt: Date;
    friends: FriendDTO[];
    _id: string;

}

export interface FriendDTO {
    _id: string, 
    description: string,
    profilePicture: string,
    username: string
}

export interface AuthUser {
    _id: string;
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