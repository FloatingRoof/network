import React from "react";
import {sendMessageCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

// const DialogsContainer = (props) => {
//
//     let state = props.store.getState().dialogsPage;
//
//
//     let onSendMessageClick = () => {
//         props.store.dispatch(sendMessageCreator());
//     }
//
//
//     let onNewMessageChange = (body) => {
//         props.store.dispatch(updateNewMessageBodyCreator(body));
//     }
//
//     return (
//         <Dialogs sendMessage={onSendMessageClick} updateNewMessageBody ={onNewMessageChange}
//                 dialogsPage={state}/>
//     );
//
// };



let mapStateToProps = (state) => {
    return{
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps =(dispatch) => {
    return{
        sendMessage: (newMessageBody) =>{
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
}



/*HOC*/
// let AuthRedirectComponent =  withAuthRedirect(Dialogs);
//
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
;
