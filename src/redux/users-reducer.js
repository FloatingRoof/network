import {usersAPI} from "../api/api";

const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
// Инициализируем стор по умолчанию
let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    /*Загрузка*/
    isFetching: true,
    followingIsProgress: []
}


const usersReducer = (state = initialState, action) => {
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
export const requestUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(setUsers(data.items));
        dispatch(toggleIsFetching(false));
    }
}


let followUnfollowFlow = async (dispatch,userId, apiMethod) =>{
    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode == 0) {
        dispatch(toggleFollow(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}


export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch,userId,usersAPI.follow.bind(usersAPI));
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch,userId, usersAPI.unfollow.bind(usersAPI) );
    }
}


/*Action Creators*/
export const toggleFollow = (userId) =>
    ({type: TOGGLE_FOLLOW, userId})

export const setCurrentPage = (currentPage) =>
    ({type: SET_CURRENT_PAGE, currentPage})

export const setUsers = (users) =>
    ({type: SET_USERS, users})

export const setTotalUsersCount = (totalUsersCount) =>
    ({type: SET_TOTAL_USER_COUNT, totalUsersCount})

export const toggleIsFetching = (isFetching) =>
    ({type: TOGGLE_IS_FETCHING, isFetching})

export const toggleFollowingProgress = (isFetching, userId) =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export default usersReducer;
