import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";



const Profile = (props) => {

    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto} isOwner={props.isOwner}  idUser={props.idUser} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} />
            <MyPostsContainer   />
        </div>
    );
};

export default Profile;