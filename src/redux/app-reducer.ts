import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'network/app/INITIALIZED_SUCCESS';

let initialState: InitialStateType = {
    initialized: false
}

export const appReducer = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

/*ThunkCreators*/
export const initializedApp = () => (dispatch: Function) => {
    let promise = dispatch(getAuthUserData())

    /* Если ждать много Promise то:    Promise.all([promise,...]).then(()=>{...})*/
    promise.then(() => {
        dispatch(initializedSuccess());
    });
}


/* ActionCreators*/
export const initializedSuccess = (): InitializedSuccessActionType => (
    {
        type: INITIALIZED_SUCCESS
    }
);

//Types
type InitialStateType = {
    initialized: boolean
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}