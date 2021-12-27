import React from 'react'
import {Formik, Form, ErrorMessage, Field} from 'formik'
import FormikControl from "../../../common/FormikControl/FormikControl";
import * as Yup from "yup";

const AddNewPostForm = (props) => {

    const initialValues = {
        newPostText: ''
    }

    const onSubmit = (values,  submitProps) => {
        props.addPost(values.newPostText);
        submitProps.resetForm();
    }

    const validationSchema = Yup.object(
        {
            newPostText: Yup.string().required('Required'),
        });

    return (
        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            {formik => {
                return (
                    <Form>
                        <div>
                            <FormikControl control="textarea" name="newPostText"/>
                        </div>
                        <div>
                            <button type="submit" disabled={!formik.isValid}>Add post</button>
                        </div>
                    </Form>
                )
            }}

        </Formik>
    );
}

export default AddNewPostForm

