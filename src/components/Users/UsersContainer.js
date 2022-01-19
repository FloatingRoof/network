import {connect} from 'react-redux';
import {
    follow,
    requestUsers,
    unfollow
} from '../../redux/users-reducer';
import React from 'react';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingIsProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";


class UsersContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize, this.props.isFriends);
    }


    componentDidUpdate(prevProps, prevState){
        if(this.props.isFriends != prevProps.isFriends)
        {
            const {currentPage, pageSize} = this.props;
            this.props.getUsers(currentPage, pageSize, this.props.isFriends);
        }
    }


    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize, this.props.isFriends);
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> :
                    <Users totalUsersCount={this.props.totalUsersCount}
                           pageSize={this.props.pageSize}
                           currentPage={this.props.currentPage}
                           users={this.props.users}
                           onPageChanged={this.onPageChanged}
                           followingIsProgress={this.props.followingIsProgress} follow={this.props.follow}
                           unfollow={this.props.unfollow}

                    />}
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingIsProgress: getFollowingIsProgress(state)
    }
}

export default compose(connect(mapStateToProps, {

    getUsers: requestUsers, follow, unfollow

}),)(UsersContainer);

