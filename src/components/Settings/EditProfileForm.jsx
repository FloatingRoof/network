import classes from './Settings.module.css'
import * as Yup from "yup";
import {Field, FieldArray, Form, Formik} from "formik";
import FormikControl from "../common/FormikControl/FormikControl";
import TextError from "../common/TextError/TextError";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Preloader from "../common/Preloader/Preloader";
import {socialIcons} from "../../utils/socialIcon";

const EditProfileForm = (props) => {
    const initialValues = {
        fullName: props.fullName,
        lookingForAJob: props.lookingForAJob,
        lookingForAJobDescription: props.lookingForAJobDescription,
        aboutMe: props.aboutMe,
        contacts: props.contacts
    };

    const onSubmit = async (values, {setStatus, setSubmitting}) => {
        setStatus("");
        await props.onSubmit(values, setStatus);
        setSubmitting(false);
    };


    const validationSchema = Yup.object(
        {
            fullName: Yup.string().required('Required'),
            lookingForAJobDescription: Yup.string().required("Required"),
            aboutMe: Yup.string().required("Required")
        }
    )


    return (

        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit} enableReinitialize>

            {formik => {

                return (
                    <Form>
                        <div className={classes.block}>
                            <FormikControl error={formik.touched.email && formik.errors.email}
                                           label="Full name" control="input"
                                           name="fullName"
                            />
                        </div>
                        <div className={classes.block}>
                            <FormikControl control="checkBox" name="lookingForAJob"
                                           label="Looking for A job"/>

                        </div>


                        <div className={classes.block}>
                            <FormikControl control="textarea" name="lookingForAJobDescription"
                                           label="My professional skills"/>
                        </div>
                        <div className={classes.block}>
                            <FormikControl control="textarea" name="aboutMe"
                                           label="About me"/>
                        </div>

                        <FieldArray name='phNumbers'>
                            {fieldArrayProps => {
                                const {form} = fieldArrayProps
                                const {values} = form
                                const {contacts} = values
                                return (
                                    <div>
                                        {Object.keys(contacts).map((contact) => (
                                            <div className={classes.block} key={contact}>
                                                <FormikControl control="input" name={`contacts.${contact}`}
                                                               label={<span><FontAwesomeIcon
                                                                   icon={socialIcons[contact]}/> {contact}</span>}/>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }}
                        </FieldArray>

                        <div className={classes.blockButton}>
                            <button className={classes.button} type='submit'
                                    disabled={!formik.isValid || formik.isSubmitting}>
                                {formik.isSubmitting ?
                                    <Preloader w="45px" h="45px"/>
                                    : "Save profile"
                                }

                            </button>
                        </div>

                        <div className={classes.blockError}>
                            {
                                formik.status !== "Profile data updated" ?
                                    <TextError>{formik.status}</TextError>
                                    :
                                    <div className={classes.goodMessage}>{formik.status}</div>
                            }

                        </div>

                    </Form>
                )
            }}
        </Formik>
    );
}

export default EditProfileForm