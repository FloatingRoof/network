import {authAPI} from "../api/api";

const SET_USER_DATA = 'network/auth/SET_USER_DATA';

// Инициализируем стор по умолчанию
let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    /*Загрузка*/
    isFetching: false
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }

        default:
            return state;
    }
}

/*Thunk*/

export const getAuthUserData = () => async (dispatch) => {
    let data = await authAPI.authMe();
    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login = (email, password, rememberMe, setStatus) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        setStatus(message)
    }
}

export const logout = (email, password, rememberMe) => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));

    }
}

/*ActionCreator*/
export const setAuthUserData = (id, email, login, isAuth) =>
    ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})


export default authReducer;
