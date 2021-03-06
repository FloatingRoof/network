import React, {useEffect, useState} from "react";
import classes from "./ProfileInfo.module.css";

const ProfileStatusWithHooks = (props) => {


    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);


    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }


    return (
        <>
            {
                props.isOwner ?
                    <>
                        {!editMode &&
                        <div>
                        <span onClick={activateEditMode} className={classes.aboutMe + " " + classes.aboutMeForEdit}>{(props.status) ? props.status :
                            <span className={classes.aboutAdd}>Set status</span>} </span>
                        </div>
                        }
                        {editMode &&
                        <div>
                            <input value={status} autoFocus={true} onChange={onStatusChange} onBlur={deactivateEditMode}
                            />
                        </div>
                        }
                    </>
                    :
                    <>
                        {props.status && <span className={classes.aboutMe}>{props.status}</span>}
                    </>
            }

        </>
    );
}

export default ProfileStatusWithHooks;