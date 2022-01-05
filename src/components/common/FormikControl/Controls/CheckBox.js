import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from "../../TextError/TextError";
import classes from "./CheckBox.module.css"
function Input (props) {
    const { label, name, ...rest } = props

    return (
        <div >
            <Field className={classes.customCheckbox} type="checkbox" id={name} name={name}  {...rest} />

            <label  htmlFor={name}>{label}</label>
            <ErrorMessage component={TextError} name={name} />
        </div>
    )
}

export default Input
