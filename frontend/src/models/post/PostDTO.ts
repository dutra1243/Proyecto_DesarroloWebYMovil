export interface PostDTO {
    _id: string;
    user: {
        _id: string,
        username: string,
        profilePicture: string
    };
    imageUrl: string;
    caption: string;
    comments: {
        _id: string,
        content: string,
        user: {
            _id: string,
            username: string,
        },
    }[];
    likes: any[];
    createdAt: string;
    __v: number;
}