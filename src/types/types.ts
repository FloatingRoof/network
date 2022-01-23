export type ProfileType = {
    userId:  number | null
    lookingForAJob:   boolean | null
    lookingForAJobDescription: string | null
    fullName:  string | null
    contacts: ContactsType,
    photos: PhotosType
}
export type ContactsType ={
    github:  string | null,
    vk: string | null,
    facebook:  string | null,
    instagram:  string | null,
    twitter: string | null,
    website:  string | null,
    youtube: string | null,
    mainLink: string | null,
}
export type PhotosType = {
    small: string | null,
    large: string | null
}
export type PostType = {
    id: number
    post: string
    likesCount: number

}
export type UserType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: PhotosType
    status: string | null
    followed: boolean
}

