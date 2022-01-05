import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import userPhoto from "../../../assets/images/user.png";
import React from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {NavLink} from "react-router-dom";

const ProfileInfo = (props) => {
    if (!props.profile)
        return <Preloader/>
    let onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }


    return (
        <div>
            <div className={classes.descriptionBlock}>
                <div className={classes.imageBlock}>
                    <img alt={""}
                         src={props.profile.photos.large || userPhoto}/>
                    {props.isOwner &&
                    <div className={classes.upload}><input type="file" name="file" id="input__file"
                                                           className={"input__file"}
                                                           onChange={onMainPhotoSelected}/>
                        <label htmlFor="input__file">Choose image </label>
                    </div>}
                </div>

                <div className={classes.description}>
                    <div className={classes.wrapperDescription}>
                        <div>

                            <span className={classes.name}>{props.profile.fullName}</span>

                            {
                                props.isOwner &&
                                <NavLink className={classes.settings} title="settings" to="/settings">
                                    <FontAwesomeIcon icon="cog"/>
                                </NavLink>
                            }
                        </div>

                        <ProfileStatusWithHooks isOwner={props.isOwner} status={props.status}
                                                updateUserStatus={props.updateUserStatus}/>
                        <hr className={classes.line}/>

                        <ProfileData profile={props.profile}/>
                    </div>
                </div>

            </div>
        </div>
    );
};


const ProfileData = (props) => {

    let icons = {
        facebook: ['fab', 'facebook-f'],
        twitter: ['fab', 'twitter'],
        instagram: ['fab', 'instagram'],
        youtube: ['fab', 'youtube'],
        website: "chalkboard-teacher",
        github: ['fab', 'github'],
        vk: ['fab', 'vk'],
        mainLink: "link"
    }

    return (
        <>
            <div>
                <span
                    className={classes.workStatus}>Looking for a job: {props.profile.lookingForAJob ? "YES" : "NO"}
                </span>
            </div>
            {props.profile.lookingForAJobDescription &&
            <div className={classes.DescriptionBlock}>
                <span className={classes.DescriptionTitle}>My professionally skills: </span>
                <span>{props.profile.lookingForAJobDescription}</span>
            </div>
            }
            {props.profile.aboutMe && (
                <div className={classes.DescriptionBlock}>
                    <span className={classes.DescriptionTitle}>About me: </span>
                    <span>{props.profile.aboutMe}</span>
                </div>
            ) }
            <div className={classes.social}>

                {Object.keys(props.profile.contacts).map(key => {
                    return <Contact key={key} contact={props.profile.contacts[key]} title={key}
                                    icon={icons[key]}/>
                })}
            </div>
        </>
    )
}




const Contact = (props) => {

    function addhttp(url) {
        if(!url) return url;
        if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
            url = "http://" + url;
        }
        return url;
    }
    return (
        <a href={addhttp(props.contact)} target="_blank" title={props.title}>
            <FontAwesomeIcon className={classes.icon} icon={props.icon}/>
        </a>
    )
}

export default ProfileInfo;