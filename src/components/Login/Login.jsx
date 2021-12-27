import {Formik, Form, Field, ErrorMessage} from "formik";
import React from "react";
import * as Yup from 'yup'
import FormikControl from "../common/FormikControl/FormikControl";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import TextError from "../common/TextError/TextError";


const LoginForm = (props) => {


    const initialValues = {
        email: '',
        password: '',
        rememberMe: false
    };

    const onSubmit = (values, {setStatus} )=> {
        props.login(values.email,values.password,values.rememberMe,setStatus);
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
            {formik =>{
                return(
                    <Form>
                        <div>
                            <FormikControl control="input" type="email" name="email" name="email"
                                   placeholder={"Email"} />
                        </div>
                        <div>
                            <FormikControl control="input" type="password"  name="password"
                                   placeholder={"Password"} />
                        </div>
                        <div>
                            <FormikControl control="input"  type="checkbox"
                                    name="rememberMe" /> remember me
                        </div>
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

const Login = (props) => {
    if(props.isAuth) return <Navigate to="/profile"/>
    return (
        <div>
            <h1>Login</h1>
            <LoginForm login={props.login}/>
        </div>
    );
}


let mapStateToProps = (state) => {
    return{
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {login})(Login);