export interface PostDTO {
    __v: number;
    _id: string;
    caption: string;
    comments: any[];
    createdAt: string;
    imageUrl: string;
    likes: any[];
    user: {
        _id: string;
        profilePicture: string;
        username: string;
    };
}