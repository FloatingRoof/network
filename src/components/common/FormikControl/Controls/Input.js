import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from "../../TextError/TextError";
import classes from "./Input.module.css"

function Input (props) {
  const { label, name, error, ...rest } = props

  return (
    <div className={classes.formControl}>
      <Field className={classes.input + " " + (error && classes.inputError)} id={name} name={name}  {...rest} />
      <span className={classes.bar  + " " + (error && classes.barError)}></span>
      <label className={classes.label} htmlFor={name}>{label}</label>
        <ErrorMessage component={TextError} name={name} />

    </div>
  )
}

export default Input
