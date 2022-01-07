import classes from './Settings.module.css'
import EditProfileForm from "./EditProfileForm";

const Settings = (props) => {




    return (
        <div className={classes.mainBlock + " content-block"}>
            <h3 className={classes.head}>Edit your Profile</h3>
            <hr className={classes.line}/>
            <EditProfileForm {...props.profile} onSubmit={props.saveProfile} />
        </div>
    );

};



export default Settings;
