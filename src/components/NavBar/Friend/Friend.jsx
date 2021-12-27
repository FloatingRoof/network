import classes from './Friend.module.css'
import {NavLink} from "react-router-dom";

const Friend = (props) => {
    return (
        <li className={classes.friend}>
            <div>
                <NavLink to={'/friend/' +props.id} className={classes.friends_link}>
                    <div>
                        <img
                            src={props.photo}/>
                    </div>
                    <div>
                        <span>{props.name}</span>
                    </div>
                </NavLink>
            </div>
        </li>
    );
};

export default Friend;