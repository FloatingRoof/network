import Settings from "./Settings";
import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {deleteUserProfile, getUserProfile, saveProfile} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";

const SettingsContainer = (props) => {

    useEffect(() => {

        if(props.id)
        props.getUserProfile(props.id)
        return function(){
            props.deleteUserProfile()
        }
    }, [props.id]);

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

export default connect(mapStateToProps, {getUserProfile, saveProfile, deleteUserProfile})(SettingsContainer)