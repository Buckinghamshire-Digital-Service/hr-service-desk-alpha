import React from 'react'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Heading from './components/Heading/Heading.jsx'
import Text from './components/Text/Text.jsx'
import Blockquote from './components/Blockquote/Blockquote.jsx'
import List from './components/List/List.jsx'
import Progress from './components/Progress/Progress.jsx'
import Callout from './components/Callout/Callout.jsx'
import Collapsible from './components/Collapsible/Collapsible.jsx'

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {

      let reactComponent = null
      const system = node.data.target.sys

      if (system && system.contentType) {
        const type = system.contentType.sys.id
        const rand = Math.floor((Math.random() * 10000) + 1)

        switch (type) {
          case 'heading':
            reactComponent = <Heading {...node.data.target.fields} key={system.id + rand} />
            break
          case 'text':
            reactComponent = <Text {...node.data.target.fields} key={system.id + rand} />
            break
          case 'callout':
            reactComponent = <Callout {...node.data.target.fields} key={system.id + rand} />
            break
          case 'list':
            reactComponent = <List {...node.data.target.fields} key={system.id + rand} />
            break
          case 'collapsible':
            reactComponent = <Collapsible {...node.data.target.fields} key={system.id + rand} />
            break
          case 'blockquote':
            reactComponent = <Blockquote {...node.data.target.fields} key={system.id + rand} />
            break             
          case 'progress':
            reactComponent = <Progress {...node.data.target.fields} key={system.id + rand} />
            break              
          default:
            console.error('Could not match ' + type)
            //continue
        }

        return reactComponent
      }
    }
  }
}


const renderer = (data) => {
  return documentToReactComponents(data, options)
}


export default renderer