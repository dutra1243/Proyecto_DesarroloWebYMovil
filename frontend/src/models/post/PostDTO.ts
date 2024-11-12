export interface PostDTO {
    _id: string;
    user: {
        _id: string,
        username: string,
        profilePicture: string
    };
    imageUrl: string;
    caption: string;
    comments: any[];
    likes: any[];
    createdAt: string;
    __v: number;
}