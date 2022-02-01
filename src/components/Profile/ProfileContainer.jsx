import React from 'react';
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


const withRouter = WrappedComponent => props => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks
    return (
        <WrappedComponent
            {...props}
            params={params}
            // etc...
        />
    );
};


class ProfileContainer extends React.Component {

    state = {
        isAuthUser: true
    }

    refreshProfile() {
        let userId = this.props.params.userId ? this.props.params.userId : this.props.authorizedUserId;
        if (!userId) {
            this.setState({isAuthUser: false})
        }else
        {
            this.props.getUserStatus(userId);
            this.props.getUserProfile(userId);
        }

    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.params.userId !== this.props.params.userId) || (prevProps.isAuth != this.props.isAuth)) {
            this.refreshProfile();
        }
    }

    render() {
        if (!this.state.isAuthUser) return <Navigate to="/login"/>
        return (
            <Profile isOwner={!this.props.params.userId} {...this.props} /*profile={this.props.profile}*/ />
        )
    };
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
    idUser: state.auth.id
})

// let ProfileMatch = (props) => {
//     let match = useMatch("/profile/:userId");
//     return <AuthRedirectComponent {...props} match={match}/>;
// };

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, deleteUserProfile}),
    withRouter,
    /* withAuthRedirect*/
)(ProfileContainer);


