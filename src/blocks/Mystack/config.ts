import { Block } from 'payload';

import {
    FixedToolbarFeature,
    InlineToolbarFeature,
    lexicalEditor,
  } from '@payloadcms/richtext-lexical'

  export const Mystack: Block = {
    slug: 'mystack',
    fields: [
        {
            name:  'title',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
            editor: lexicalEditor({
              features: ({ rootFeatures }) => {
                return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
              },
            }),
            label: false,
            required: false,
          }, 
          {
            name: 'logos',
            type: 'array',
            minRows: 1,
            maxRows: 10,
            fields: [
              {
                name: 'logo',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
              {
                name: 'altText', 
                type: 'text',
                required: true, 
                label: 'Image Alt Text', 
              }
            ],
          }
    ],
    interfaceName: 'MystackBlock',
  }
