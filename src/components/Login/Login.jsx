import {Formik, Form, Field, ErrorMessage} from "formik";
import React from "react";
import * as Yup from 'yup'
import FormikControl from "../common/FormikControl/FormikControl";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import TextError from "../common/TextError/TextError";
import classes from "./Login.module.css"

const LoginForm = (props) => {


    const initialValues = {
        email: '',
        password: '',
        rememberMe: false
    };

    const onSubmit = (values, {setStatus}) => {
        props.login(values.email, values.password, values.rememberMe, setStatus);
        console.log('Submit', values)
    };


    const validationSchema = Yup.object(
        {
            email: Yup.string().email('Invalid email format').required('Required'),
            password: Yup.string().required('Required')

        }
    )

    return (
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
            {formik => {
                return (
                    <Form>
                        <div className={classes.field}>
                            <FormikControl error={formik.touched.email && formik.errors.email} label="Email"
                                           control="input" type="email" name="email"
                            />
                        </div>
                        <div className={classes.field}>
                            <FormikControl error={formik.touched.password && formik.errors.password} control="input"
                                           type="password" name="password"
                                           label={"Password"}/>
                        </div>
                        <div className={classes.field}>
                            <FormikControl control="checkBox"
                                           label="Remember me" name="rememberMe"/>
                        </div>
                        <div className={classes.blockButton}>
                            <button className={classes.button} type='submit' disabled={!formik.isValid || formik.isSubmitting}>
                                LOGIN
                            </button>
                        </div>
                        <div className={classes.blockError}>
                            <TextError>{formik.status}</TextError>
                        </div>


                    </Form>
                )
            }}
        </Formik>
    );
}

const Login = (props) => {
    if (props.isAuth) return <Navigate to="/profile"/>
    return (
        <div className={"content-block " + classes.mainBlock}>
            <div>
                <h1>Login</h1>
                <LoginForm login={props.login}/>
            </div>
        </div>
    );
}


let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {login})(Login);