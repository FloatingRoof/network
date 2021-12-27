import classes from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={classes.header}>

            <img alt={""}
                 src={"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1024px-International_Pok%C3%A9mon_logo.svg.png"}/>
            <div className={classes.loginBlock}>
                {props.isAuth ?<div>{props.login} - <button onClick={props.logout}>Log out</button></div>  : <NavLink to={'/login'} >Login</NavLink> }
            </div>
        </header>
    );
};

export default Header;