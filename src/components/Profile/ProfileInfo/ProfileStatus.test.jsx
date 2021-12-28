import React from "react";
import classes from "./ProfileInfo.module.css";
import {updateUserStatus} from "../../../redux/profile-reducer";

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }


    activeEditMode = () => {
        this.setState({
            editMode: true
        });

    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);
    }

    onStatusChange = (e) =>{
        this.setState({
            status: e.currentTarget.value
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.status !== this.props.status)
        this.setState({
            status: this.props.status
        })


    }


    render() {
        console.log("render");
        return (
            <>
                {!this.state.editMode &&
                <div>
                        <span onClick={this.activeEditMode} className={classes.aboutMe}>{this.props.status  ? this.props.status :
                            <span className={classes.aboutAdd}>Установить статус</span>} </span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
                </div>
                }
            </>
        );
    }

}

export default ProfileStatus;