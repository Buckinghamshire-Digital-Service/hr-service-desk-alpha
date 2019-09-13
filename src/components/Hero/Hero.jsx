import React from 'react'

const Hero = props => {
  let image = (props.hero && props.hero.image) !== null ? props.hero.image[0].file.url : 'none'

  return (
    <div className={`hero ${image === 'none' ? 'hero--shallow' : ''}`} style={{backgroundImage: `url(${image})`}}>
      {props.children}
    </div>
  )
}

export default Hero
