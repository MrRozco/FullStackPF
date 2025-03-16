import { Block } from 'payload';
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

export const Portfolio: Block = {
  slug: 'portfolio',
  interfaceName: 'PortfolioBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Portfolio Title',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Card Image',
        },
        {
          name: 'modal',
          type: 'group',
          label: 'Modal Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Modal Title',
            },
            {
              name: 'text',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
                },
              }),
              required: true,
              label: 'Modal Text',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Modal Image',
            },
            {
              name: 'buttons',
              type: 'array',
              label: 'Modal Buttons',
              minRows: 2,
              maxRows: 2,
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  label: 'Button Text',
                },
                {
                  name: 'link',
                  type: 'text',
                  required: true,
                  label: 'Button Link',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};