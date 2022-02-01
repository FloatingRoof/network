import {profileAPI, usersAPI} from "../api/api";
import {getAuthUserData} from "./auth-reducer";
import {errorMessage} from "../utils/errorMessage";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'network/profile/ADD-POST';
const SET_USER_PROFILE = 'network/profile/SET_USER_PROFILE';
const SET_STATUS = 'network/profile/SET_STATUS';
const DELETE_POST = 'network/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'network/profile/SAVE_PHOTO_SUCCESS';
const DELETE_USER_PROFILE = 'network/profile/DELETE_USER_PROFILE'

// Инициализируем стор по умолчанию

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

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string

}

export const addPostActionCreator = (newPostText: string) : AddPostActionCreatorActionType =>
    ({type: ADD_POST, newPostText});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetUserStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

export const setUserStatus = (status: string): SetUserStatusActionType => ({type: SET_STATUS, status});

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}

export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}


export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});


type DeleteUserProfileActionType = {
    type: typeof DELETE_USER_PROFILE
}

export const deleteUserProfile = (): DeleteUserProfileActionType => ({type: DELETE_USER_PROFILE});


export default profileReducer;