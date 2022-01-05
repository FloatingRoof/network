import * as Yup from "yup";
import {Form, Formik} from "formik";
import FormikControl from "../common/FormikControl/FormikControl";
import TextError from "../common/TextError/TextError";
import React from "react";

const EditProfileForm = (props) => {

    const initialValues = {
        fullName: props.fullName,
        lookingForAJob: props.lookingForAJob,
        lookingForAJobDescription: props.lookingForAJobDescription,

        email: '',
        password: '',
        rememberMe: false
    };

    const onSubmit = (values, {setStatus} )=> {
        props.login(values.email,values.password,values.rememberMe,setStatus);
    };


    const validationSchema = Yup.object(
        {
            fullName: Yup.string().required('Reqiured')
        }
    )



    return(
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit} enableReinitialize>
            {formik =>{
                console.log(formik);
                return(
                    <Form>
                        <FormikControl label="Full name" control="input" type="text" name="fullName"
                                     />
                        <FormikControl control="checkBox" name="lookingForAJob" label="Looking for A job"/>
                        {
                            formik.values.lookingForAJob &&
                            <FormikControl control="textarea" name="lookingForAJobDescription" label="Looking for a job description"/>
                        }

                        <div>
                            <button type='submit' disabled={!formik.isValid}>Login</button>
                        </div>
                        <TextError>{formik.status}</TextError>
                    </Form>
                )
            }}
        </Formik>
    );
}
export default EditProfileForm