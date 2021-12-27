import classes from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {
    return (
        <li className={classes.dialog}>
                <NavLink className={(navData) => navData.isActive ? classes.Active : classes.Item}
                         to={"/dialogs/" + props.id}>
                    <img src={props.photo}/>
                    <span>{props.name}</span>
                </NavLink>
        </li>
    );
}


export default DialogItem;
