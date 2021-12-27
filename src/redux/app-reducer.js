import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState ={
    initialized: false
}
export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return{
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

/*ThunkCreators*/

export const initializedApp = () => (dispatch) =>{
    let promise = dispatch(getAuthUserData())

    /* Если ждать много Promise то:    Promise.all([promise,...]).then(()=>{...})*/
    promise.then(()=>{
        dispatch(initializedSuccess());
    });
}



/* ActionCreators*/
export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS
})