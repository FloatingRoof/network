import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from "../../TextError/TextError";
import classes from "./Textarea.module.css"

function Textarea (props) {
  const { label, name, error, ...rest } = props
  return (
    <div className={classes.formControl}>
      <Field className={classes.input} as='textarea' id={name} name={name} {...rest} />

        <span className={classes.bar  + " " + (error && classes.barError)}></span>
        <label className={classes.label} htmlFor={name}>{label}</label>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Textarea
