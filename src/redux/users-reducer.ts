import {usersAPI} from "../api/api";
import {PhotosType, UserType} from "../types/types";
const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';



// Инициализируем стор по умолчанию
let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    /*Загрузка*/
    isFetching: true,
    followingIsProgress: [] as Array<number> // Array of usersId
}

type InitialStateType = typeof initialState;



const usersReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case TOGGLE_FOLLOW: {
            return {
                ...state,
                // users:[...state.users]

                users: state.users.map(u => {
                    if (u.id === action.userId)
                        return {...u, followed: !u.followed}
                    return u
                })
            }
        }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USER_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingIsProgress: action.isFetching
                    ? [...state.followingIsProgress, (action.userId)]
                    : /* убираем (фильтруем) человека*/ [state.followingIsProgress.filter(id => id != action.userId)]
            }
        }
        default:
            return state;
    }
}




/* Thunks Creators*/
export const requestUsers = (currentPage: number, pageSize: number, isFriends: boolean) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        let data = await usersAPI.getUsers(currentPage, pageSize, isFriends);
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(setUsers(data.items));
        dispatch(toggleIsFetching(false));
    }
}


let followUnfollowFlow = async (dispatch: any,userId: number, apiMethod: Function) =>{
    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode == 0) {
        dispatch(toggleFollow(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}


export const follow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch,userId,usersAPI.follow.bind(usersAPI));
    }
}

export const unfollow = (userId:number) => {
    return async (dispatch:any) => {
        followUnfollowFlow(dispatch,userId, usersAPI.unfollow.bind(usersAPI) );
    }
}


/*Action Creators*/


export const toggleFollow = (userId:number): ToggleFollowActionType =>
    ({type: TOGGLE_FOLLOW, userId})

type ToggleFollowActionType = {
    type: typeof TOGGLE_FOLLOW
    userId: number
}


export const setCurrentPage = (currentPage:number): SetCurrentPageActionType =>
    ({type: SET_CURRENT_PAGE, currentPage})


type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}


export const setUsers = (users: Array<UserType>): SetUsersActionType =>
    ({type: SET_USERS, users})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType =>
    ({type: SET_TOTAL_USER_COUNT, totalUsersCount})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USER_COUNT
    totalUsersCount: number
}

export const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingActionType =>
    ({type: TOGGLE_IS_FETCHING, isFetching})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const toggleFollowingProgress = (isFetching:boolean, userId:number):ToggleFollowingProgressActionType =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

export default usersReducer;
