import React, {useEffect, useState} from 'react';
import Profile from "./Profile";
import {
    getUserStatus,
    getUserProfile,
    updateUserStatus,
    savePhoto,
    deleteUserProfile
} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {Navigate, useMatch, useParams} from "react-router-dom";
import {compose} from "redux";
import Preloader from "../common/Preloader/Preloader";


const withRouter = WrappedComponent => props => {
    const params = useParams();
    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};


const ProfileContainerHook = (props) => {

    let [id, setId] = useState(-1);


    useEffect(() => {

            let userId = props.params.userId ?? props.authorizedUserId;
            if (userId) {
                props.getUserStatus(userId);
                props.getUserProfile(userId);
            }
            setId(userId);
            return function () {
                props.deleteUserProfile();
            }
        }
        , [props.params.userId, props.authorizedUserId])


    return (
        <>

            {id ? !props.profile ? <Preloader/> :
                <Profile isOwner={!props.params.userId} {...props} /*profile={this.props.profile}*/ /> :
                <Navigate to={"/login"}/>}
        </>
    )

};

/*HOC*/
//
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
//
//
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
//

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,

})

// let ProfileMatch = (props) => {
//     let match = useMatch("/profile/:userId");
//     return <AuthRedirectComponent {...props} match={match}/>;
// };

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, deleteUserProfile}),
    withRouter,
    /* withAuthRedirect*/
)(ProfileContainerHook);


