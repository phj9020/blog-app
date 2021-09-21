export interface Ipost {
    _id: string,
    title: string,
    description: string,
    owner: {
        createdAt: string,
        email: string,
        posts: Array<string>,
        profilePic: string,
        updatedAt: string,
        username: string,
        _id: string,
    },
    photo: string,
    username: string,
    categories: Array<string>,
    createdAt: string,
    updatedAt: string,
}

export interface Icategory  {
    _id: string,
    name: string,
}

export interface IRegisterStateType {
    email: string,
    password: string,
}

export interface newPost {
    owner: {
        _id: string,
    },
    categories: Array<string>
    username: string,
    title: string,
    description: string,
    photo?: string
}
