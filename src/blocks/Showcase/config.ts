import { Block } from 'payload';

import {
    FixedToolbarFeature,
    InlineToolbarFeature,
    lexicalEditor,
  } from '@payloadcms/richtext-lexical'

export const Showcase: Block = {
   slug: 'showcase',
    fields: [
      {
         name: 'title',
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
            required: true,
          },
          {
            name: 'button',
            type: 'group', // Group for button text and link
            label: 'Button',
            fields: [
              {
                name: 'text',
                type: 'text',
                required: true,
                label: 'Button Text',
                defaultValue: 'Learn More', // Optional: Provides a default
              },
              {
                name: 'link',
                type: 'relationship',
                relationTo: 'pages',
                required: true,
                label: 'Page Link',
              },
            ],
          },
      {
         name: 'items',
         type: 'array',
         minRows: 1,
         maxRows: 4,
         fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
                name: 'altText', // New field for alt text
                type: 'text',
                required: true, // Optional: Set to false if not always needed
                label: 'Image Alt Text', // Improves admin UI clarity
              }
         ],
      },
    ],
    interfaceName: 'ShowcaseBlock',
}