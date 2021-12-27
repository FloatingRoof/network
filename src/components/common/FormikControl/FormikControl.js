import React from 'react'
import Input from './Controls/Input'
import Textarea from './Controls/Textarea'
import Select from './Controls/Select'
import RadioButtons from './Controls/RadioButtons'
import CheckboxGroup from './Controls/CheckboxGroup'

/*import DatePicker from './DatePicker'
import ChakraInput from './ChakraInput'*/

function FormikControl (props) {
  const { control, ...rest } = props
  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'textarea':
      return <Textarea {...rest} />
    case 'select':
      return <Select {...rest} />
    case 'radio':
      return <RadioButtons {...rest} />
    case 'checkboxGroup':
      return <CheckboxGroup {...rest} />
   /*case 'date':
      return <DatePicker {...rest} />*/
    /*case 'chakraInput':
      return <ChakraInput {...rest} />*/
    default:
      return null
  }
}

export default FormikControl
