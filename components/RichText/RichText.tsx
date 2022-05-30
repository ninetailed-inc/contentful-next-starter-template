import React from 'react';
import {
  isRichText,
  renderRichText,
  RenderRichTextOptions,
} from '@/lib/rich-text';

export interface RichTextProps {
  richTextDocument: unknown;
  classNames?: RenderRichTextOptions['classNames'];
  renderNode?: RenderRichTextOptions['renderNode'];
  className?: string;
}

// @ts-ignore
export const RichText: React.FC<RichTextProps> = ({
  richTextDocument,
  classNames = {},
  renderNode = {},
  ...rest
}) => {
  if (isRichText(richTextDocument)) {
    const component = renderRichText(richTextDocument, {
      classNames,
      renderNode,
    });

    return React.Children.map(component, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, rest);
      }
      return child;
    });
  }

  return null;
};
