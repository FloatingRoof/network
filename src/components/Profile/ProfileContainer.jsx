import React from 'react';
import Profile from "./Profile";
import {getUserStatus, getUserProfile, updateUserStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {Navigate, useMatch, useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
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
        isUser: true
    }
    componentDidMount() {
        let userId = this.props.params.userId ? this.props.params.userId : this.props.authorizedUserId;
        if(!userId) this.setState({isUser: false})
        this.props.getUserStatus(userId);
        this.props.getUserProfile(userId);
    }


    render() {
        if(!this.state.isUser) return <Navigate to="/login" />
            return (

            <Profile {...this.props}    /*profile={this.props.profile}*/ />
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
    isAuth: state.auth.isAuth
})

// let ProfileMatch = (props) => {
//     let match = useMatch("/profile/:userId");
//     return <AuthRedirectComponent {...props} match={match}/>;
// };

export default compose(
    connect(mapStateToProps, {getUserProfile,getUserStatus,updateUserStatus}),
    withRouter,
   /* withAuthRedirect*/
)(ProfileContainer);


