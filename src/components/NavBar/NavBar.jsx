import classes from './NavBar.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";
import cn from "classnames"




const NavBar = (props) => {
    return (
        <nav className={classes.nav}>
            <ul className={classes.side_bar_ul}>
                <li className={classes.item}>
                        <NavLink className={(navData) => navData.isActive ? classes.active : classes.item} to="/profile">
                        <div>
                            <FontAwesomeIcon className={classes.icon} icon="dragon"/>
                        </div>
                        Profile
                    </NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink className={(navData) => navData.isActive ? classes.active : classes.item} to="/dialogs">
                        <div>
                            <FontAwesomeIcon className={classes.icon} icon="comments"/>
                        </div>
                        Message
                    </NavLink>
                </li>

                <li className={classes.item}>
                    <NavLink className={(navData) => navData.isActive ? classes.active : classes.item} to="/friends">
                        <div>
                            <FontAwesomeIcon className={classes.icon} icon="user-friends"/>
                        </div>
                        Friends
                    </NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink className={(navData) => navData.isActive ? classes.active : classes.item} to="/news">
                        <div>
                            <FontAwesomeIcon className={classes.icon} icon="paper-plane"/>
                        </div>
                        News
                    </NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink className={(navData) => navData.isActive ? classes.active : classes.item} to="/users">
                        <div>
                            <FontAwesomeIcon className={classes.icon} icon="search"/>
                        </div>
                        Users
                    </NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink className={(navData) => navData.isActive ? classes.active : classes.item} to="/music">
                        <div>
                            <FontAwesomeIcon className={classes.icon} icon="guitar"/>
                        </div>
                        Music
                    </NavLink>
                </li>
                <li className={classes.item}>
                    <hr className={classes.line}/>
                </li>
                <li className={classes.item}>
                    <NavLink className={(navData) => navData.isActive ? classes.active : classes.item} to="/settings">
                        <div>
                            <FontAwesomeIcon className={classes.icon} icon="sliders-h"/>
                        </div>
                        Settings
                    </NavLink>
                </li>

                <li>
                    <ul className={classes.side_bar_friends}>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;