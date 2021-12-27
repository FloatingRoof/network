import classes from './../Dialogs.module.css';

const Message = (props) => {


    return (
        /*заменить тут как в тетради*/
        <div className={classes.message + " " + (props.messageMy ? classes.my : classes.its)}>{props.message}</div>
    );
}

export default Message;
