import React from 'react';
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";

let User = ({user, followingIsProgress, unfollow, follow}) => {

    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                 className={classes.userPhoto}/>
                        </NavLink>

                    </div>
                     <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                    </span>
                    <div>
                            {user.followed ?
                                <button disabled={followingIsProgress.some(id => id == user.id)} id={user.id}
                                        onClick={() => {
                                            unfollow(user.id);
                                        }}>Unfollow</button>
                                :
                                <button disabled={followingIsProgress.some(id => id == user.id)} id={user.id}
                                        onClick={() => {
                                            follow(user.id);
                                        }}>Follow</button>
                            }
                    </div>
                    <br/>

                </span>

        </div>
    );
}

export default User;