import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import userPhoto from "../../../assets/images/user.png";
import React from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
const ProfileInfo = (props) => {

    if (!props.profile)
        return <Preloader/>

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <div className={classes.imageBlock}>
                    <img alt={""}
                         src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto }/>
                </div>

                <div className={classes.description}>
                    <div className={classes.wrapperDescription}>

                        <span className={classes.name}>{props.profile.fullName}</span>
                        <ProfileStatusWithHooks isMyProfile={props.isMyProfile} status={props.status} updateUserStatus={props.updateUserStatus}/>

                        <hr className={classes.line}/>
                        <span
                            className={classes.workStatus}>{props.profile.lookingForAJob ? 'В поисках работы. ' : 'Не ищу работу.'}</span>
                        {props.profile.lookingForAJobDescription ? (
                            <div className={classes.DescriptionBlock}>
                                <span className={classes.DescriptionTitle}>Описание работы: </span>
                                <span>{props.profile.lookingForAJobDescription}</span>
                            </div>
                        ) : null}
                        {props.profile.aboutMe ? (
                            <div className={classes.DescriptionBlock}>
                                <span className={classes.DescriptionTitle}>Обо мне: </span>
                                <span>{props.profile.aboutMe}</span>
                            </div>
                        ) : null}
                        <div className={classes.social}>
                            <a href={props.profile.contacts.facebook} target="_blank" title="facebook">
                                <FontAwesomeIcon className={classes.icon} icon={['fab', 'facebook-f']}/>
                            </a>
                            <a href={props.profile.contacts.twitter} target="_blank" title="twitter">
                                <FontAwesomeIcon className={classes.icon} icon={['fab', 'twitter']}/>
                            </a>
                            <a href={props.profile.contacts.instagram} target="_blank" title="instagram">
                                <FontAwesomeIcon className={classes.icon} icon={['fab', 'instagram']}/>
                            </a>
                            <a href={props.profile.contacts.youtube}  target="_blank" title="youtube">
                                <FontAwesomeIcon className={classes.icon} icon={['fab', 'youtube']}/>
                            </a>
                            <a href={props.profile.contacts.vk} target="_blank" title="vk">
                                <FontAwesomeIcon className={classes.icon} icon={['fab', 'vk']}/>
                            </a>
                            <a href={props.profile.contacts.github} target="_blank" title="github">
                                <FontAwesomeIcon className={classes.icon} icon={['fab', 'github']}/>
                            </a>
                            <a href={props.profile.contacts.website} target="_blank" title="personal website">
                                <FontAwesomeIcon className={classes.icon} icon="chalkboard-teacher"/>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileInfo;