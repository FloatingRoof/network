import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = 'network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'network/auth/GET_CAPTCHA_URL_SUCCESS';


// export type InitialStateType = {
//     id: number | null
//     login: string | null
//     email: string | null
//     isAuth: boolean
//     captchaUrl: string | null
// }

// Инициализируем стор по умолчанию
let initialState   = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}
export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action :GetCaptchaUrlSuccessType | SetAuthUserDataActionType): InitialStateType => {
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

export const getAuthUserData = () => async (dispatch: any) => {
    let data = await authAPI.authMe();
    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login = (email: string, password: string, rememberMe: boolean,captcha: string, setStatus: Function ) => async (dispatch: any) => {
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

    export const logout = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
        dispatch(getCaptchaUrlSuccess(""));
    }
}
export const getCaptchaUrl = () => async (dispatch: any) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}



/*ActionCreator*/
export const setAuthUserData = (id: number | null , email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType =>
    ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})



export const getCaptchaUrlSuccess = (captchaUrl: string):GetCaptchaUrlSuccessType =>
    ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})


type SetAuthUserDataActionType= {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}
type SetAuthUserDataActionPayloadType ={
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}


type GetCaptchaUrlSuccessType ={
    type: typeof GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl: string}
}




export default authReducer;
