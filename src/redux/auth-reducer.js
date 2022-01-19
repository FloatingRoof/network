import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = 'network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'network/auth/GET_CAPTCHA_URL_SUCCESS';

// Инициализируем стор по умолчанию
let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null,
    /*Загрузка*/
    isFetching: false
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
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


export const login = (email, password, rememberMe,captcha, setStatus ) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        setStatus(message)
    }
}

    export const logout = (email, password, rememberMe) => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
        dispatch(getCaptchaUrlSuccess(""));
    }
}
export const getCaptchaUrl = (email, password, rememberMe) => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

/*ActionCreator*/
export const setAuthUserData = (id, email, login, isAuth) =>
    ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})

export const getCaptchaUrlSuccess = (captchaUrl) =>
    ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})


export default authReducer;
