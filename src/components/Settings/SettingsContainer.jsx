import Settings from "./Settings";
import {Navigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {deleteUserProfile, getUserProfile} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";

const SettingsContainer = (props) => {

    useEffect(() => {
        if (props.profile) {
            if (props.id !== props.profile.userId) {
                props.deleteUserProfile();
            }
        }
        props.getUserProfile(props.id)
    }, [props.id]);
    const a = < Preloader/>
    return (
        <>
            {props.isAuth ?
                <>
                    {
                        props.profile ?
                            <Settings {...props}/>
                            : <Preloader/>
                    }

                </>
                : <Navigate to="/login"/>}
        </>
    );
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    profile: state.profilePage.profile,
    id: state.auth.id,

})

export default connect(mapStateToProps, {getUserProfile, deleteUserProfile})(SettingsContainer)