import get from 'lodash/get';
import truncate from 'lodash/truncate';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

// const isTextNode = (node: unknown) => {
//   return get(node, 'sys.contentType.sys.id') == ComponentContentTypes.Text;
// };

export const getSummary = (content: unknown[] = []): string => {
  const text = content
    // .filter(isTextNode)
    .map((node) => {
      return documentToPlainTextString(get(node, 'fields.text'));
    })
    .join(' ');

  return truncate(text, { length: 70 });
};
