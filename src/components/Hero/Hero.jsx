import React from 'react'
import Img from 'gatsby-image'

const Hero = (props) => (
  <div className='hero'>
    <Img alt={props.headline} fluid={props.image[0].file.url} />
    <div>
      <h3>{props.headline}</h3>
      <p>{props.subHeading}</p>
    </div>
  </div>
)

export default Hero
