export interface Ipost {
    _id: string,
    title: string,
    description: string,
    owner: string,
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