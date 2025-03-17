import { cn } from '@/utilities/ui';
import React from 'react';
import RichText from '@/components/RichText';
import { CMSLink } from '../../components/Link';
import { Media } from '@/components/Media';

import type { ContentBlock as ContentBlockProps } from '@/payload-types';

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props;

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  };

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { contentType, enableLink, link, richText, image, size, anchorId, boxed } = col;

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })  + (boxed === 'true' ? 'border-border border bg-card p-4 hover:transform hover:scale-105 transition-transform duration-500 ' : '')}
                key={index}
                id={anchorId ?? undefined}
              >
                {contentType === 'richText' && richText && (
                  <RichText data={richText} enableGutter={false} />
                )}

                {contentType === 'image' && image && typeof image !== 'string' && (
                  <Media resource={image}/>
                )}

                {enableLink && <CMSLink {...link} />}
              </div>
            );
          })}
      </div>
    </div>
  );
};