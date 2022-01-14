import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from "../../TextError/TextError";
import classes from "./Input.module.css"
import cn from "classnames"
function Input (props) {
  const { label, name, error, ...rest } = props

  return (
    <div className={classes.formControl}>
      <Field className={cn(classes.input, {[classes.inputError]: error })} id={name} name={name}  {...rest} />
      <span className={cn(classes.bar, {[classes.barError]: error})}></span>
      <label className={classes.label} htmlFor={name}>{label}</label>
        <ErrorMessage component={TextError} name={name} />

    </div>
  )
}

export default Input
