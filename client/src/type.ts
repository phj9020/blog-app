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