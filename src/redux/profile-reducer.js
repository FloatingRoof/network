import {profileAPI, usersAPI} from "../api/api";
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const DELETE_USER_PROFILE = 'DELETE_USER_PROFILE'
// Инициализируем стор по умолчанию
let initialState = {
    posts: [
        {id: 1, post: 'Hi, how are you?', likesCount: 12, dislikesCount: 3},
        {id: 2, post: 'Hello my friend!', likesCount: 4, dislikesCount: 10},
    ],
    profile: null,
    status: ''
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id: 3,
                        post: action.newPostText,
                        likesCount: 0,
                        dislikesCount: 0
                    }
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
        case SAVE_PHOTO_SUCCESS:{
            return {
            ...state,  profile: {...state.profile, photos: action.photos}
            }
        }
        case DELETE_USER_PROFILE:{
            return {
                ...state, profile: null
            }
        }
        default:
            return state;
    }
}

/*ThunkCreators*/

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));

}
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    dispatch(savePhotoSuccess(response.data.data.photos));

}

export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response.data));
}
export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}


/*ActionCreators*/
export const addPostActionCreator = (newPostText) =>
    ({type: ADD_POST, newPostText});


export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});
export const deleteUserProfile = () => ({type: DELETE_USER_PROFILE});


export default profileReducer;
