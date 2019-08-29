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
import marked from 'marked'

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {

      let reactComponent = null
      const system = node.data.target.sys

      if (system && system.contentType) {
        const type = system.contentType.sys.id
        const rand = Math.floor((Math.random() * 10000) + 1)
        const fields = node.data.target.fields

        switch (type) {
          case 'heading':
            reactComponent = <Heading {...fields} key={system.id + rand} />
            break
          case 'text':

            reactComponent = <Text {...fields} key={system.id + rand} />
            break
          case 'callout':
            reactComponent = <Callout {...fields} key={system.id + rand} />
            break
          case 'list':
            reactComponent = <List {...fields} key={system.id + rand} />
            break
          case 'collapsible':
            fields.content = fields.content['en-US'] !== undefined ? fields.content['en-US'] : fields.content 
            fields.content = marked(fields.content)
            reactComponent = <Collapsible {...fields} key={system.id + rand} />
            break
          case 'blockquote':
            reactComponent = <Blockquote {...fields} key={system.id + rand} />
            break             
          case 'progress':
            reactComponent = <Progress {...fields} key={system.id + rand} />
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