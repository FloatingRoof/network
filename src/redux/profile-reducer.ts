import {profileAPI, usersAPI} from "../api/api";
import {getAuthUserData} from "./auth-reducer";
import {errorMessage} from "../utils/errorMessage";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const DELETE_USER_PROFILE = 'DELETE_USER_PROFILE'

// Инициализируем стор по умолчанию

type ProfileType = {
    userId:  number | null
    lookingForAJob:   boolean | null
    lookingForAJobDescription: string | null
    fullName:  string | null
    contacts: {
        github:  string | null,
        vk: string | null,
        facebook:  string | null,
        instagram:  string | null,
        twitter: string | null,
        website:  string | null,
        youtube: string | null,
        mainLink: string | null,
    },
    photos: PhotoType
}

type PhotoType = {
    photos: {
        small: string | null,
        large: string | null
    }
}

type PostType = {
    id: number
    post: string
    likesCount: number

}

let initialState = {
    posts:  [
        {id: 1, post: 'Hi, how are you?', likesCount: 12},
        {id: 2, post: 'Hello my friend!', likesCount: 4},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState;


const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: 5,
                post: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts:[
                    ...state.posts,
                    newPost
                ],
            };

        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: [...state.posts.filter(p => p.id != action.postId)]
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        case DELETE_USER_PROFILE: {
            return {
                ...state, profile: null
            }
        }
        default:
            return state;
    }
}

/*ThunkCreators*/
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}


export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}


export const saveProfile = (profile:ProfileType, setStatus: any) => async (dispatch: any) => {
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        setStatus("Profile data updated");
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        setStatus(message);
    }
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);

    dispatch(setUserStatus(response.data));
}
export const updateUserStatus = (status: string) => async (dispatch: any) => {
    try {

        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    } catch (e: any) {
        errorMessage(e.message);

    }

}


/*ActionCreators*/
export const addPostActionCreator = (newPostText: string) =>
    ({type: ADD_POST, newPostText});


export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status: string) => ({type: SET_STATUS, status});
export const deletePost = (postId: number) => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos: PhotoType) => ({type: SAVE_PHOTO_SUCCESS, photos});
export const deleteUserProfile = () => ({type: DELETE_USER_PROFILE});


export default profileReducer;