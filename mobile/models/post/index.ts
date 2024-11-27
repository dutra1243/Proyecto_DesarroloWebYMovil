export interface PostDTO {
    __v: number;
    _id: string;
    caption: string;
    comments: {
        _id: string,
        content: string,
        user: {
            _id: string,
            username: string,
        },
    }[];
    createdAt: string;
    imageUrl: string;
    likes: any[];
    user: {
        _id: string;
        profilePicture: string;
        username: string;
    };
}