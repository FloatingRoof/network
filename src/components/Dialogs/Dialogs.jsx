import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {Formik, Form, ErrorMessage, Field} from 'formik'
import * as Yup from "yup";
import FormikControl from "../common/FormikControl/FormikControl";


const Dialogs = (props) => {

    let state = props.dialogsPage;
    let messageElements = state.messages.map(m => <Message message={m.message} id={m.id}
                                                           messageMy={m.messageMy} key={m.id}/>);
    let dialogElements = state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}
                                                                 photo={dialog.photo} key={dialog.id}/>);

    /* If unauthorized user */

    return (
        <div
            className={classes.dialogs}>
            <div
                className={classes.dialogsItems}>
                <ul>
                    {dialogElements}
                </ul>
            </div>
            <div>
                <div className={classes.messages}>
                    {messageElements}
                </div>
                <AddMessageForm sendMessage={props.sendMessage}/>

            </div>
        </div>
    );

};
const AddMessageForm = (props) => {
    const initialValues = {
        newMessageBody: ''
    }
    const validationSchema = Yup.object({
        newMessageBody: Yup.string().required('Required')
    });
    const onSubmit = (values, submitProps) => {
        props.sendMessage(values.newMessageBody);
        console.log('Submit', values)
        submitProps.resetForm();
    }
return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {formik => {
            return (
                <Form>
                    <div>
                        <FormikControl control="textarea" placeholder='Enter your message' name="newMessageBody"/>
                    </div>
                    <div>
                        <button type='submit' disabled={!formik.isValid}>Send</button>
                    </div>
                </Form>
            )
        }}
    </Formik>
);
}



export default Dialogs;
