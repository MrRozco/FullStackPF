import type { Block, Field } from 'payload';

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { link } from '@/fields/link';

const columnFields: Field[] = [
  {
    name: 'anchorId',
    type: 'text',
    required: false,
    admin: {
      position: 'sidebar',
    },
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'contentType', // New field to choose between text or image
    type: 'radio',
    defaultValue: 'richText',
    options: [
      {
        label: 'Rich Text',
        value: 'richText',
      },
      {
        label: 'Image',
        value: 'image',
      },
    ],
    admin: {
      description: 'Choose whether to display text or an image in this column.',
    },
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ];
      },
    }),
    label: false,
    admin: {
      condition: (_, siblingData) => siblingData.contentType === 'richText', // Show only if richText is selected
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media', // Assumes you have a 'media' collection for uploads
    label: 'Image',
    admin: {
      condition: (_, siblingData) => siblingData.contentType === 'image', // Show only if image is selected
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
];

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
};