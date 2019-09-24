import React from 'react'
import Button from '../Button/Button.jsx'
import Icon from '../Icon/Icon.jsx'

const Form = props => {
  let classes = `form ${props.className}`
  return (
	<form autoComplete='off' className='form--search container container--constrained is-grouped' role='search' onSubmit={(e) => props.submitHandler(e)}>
	  <div className='field'>
	    <div className='field has-addons is-marginless'>
	      <label htmlFor={props.id} className='is-sr-only'>Search</label>
	      <input id={props.id} className='input is-large' value={props.query} type='text' placeholder='Search' onChange={(e) => props.onChangeHandler(e)}/>
	      <Button {...props.ariaHidden} className='btn--flat offset-right'><Icon {...props.icon}/></Button>
	    </div>
	  </div>
	</form>
  )
}

Form.defaultProps = {
  className: ''
}

export default Form