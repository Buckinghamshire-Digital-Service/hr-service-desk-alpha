import React from 'react'
import Form from '../Form/Form.jsx'
import Field from '../Field/Field.jsx'
import Button from '../Button/Button.jsx'
import Icon from '../Icon/Icon.jsx'

const Hero = props => {
  const iconSubmit = {
    label: 'Submit search',
    url: '../../../svg/magnifying.svg'
  } 
  
  return (
    //props.image[0].file.url 
    <div className='hero'>
      <Form className='form--search' role='search'>
        <Field />
        <Button className='btn--flat submit'><Icon {...iconSubmit}/></Button>
      </Form>
    </div>
  )
}

export default Hero
