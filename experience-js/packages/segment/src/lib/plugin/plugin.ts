import { AnalyticsPlugin } from 'analytics';
// No types available for this library
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import segment from '@analytics/segment';
import dot from 'dot';
import { Variant } from '@ninetailed/experience.js-shared';

// const SEGMENT_MERGED_FLAG = '__nt-segment-merged__';

// const merge = (instance) => {
//   const isMerged = instance.storage.getItem(SEGMENT_MERGED_FLAG);

//   if (isMerged) {
//     return;
//   }

//   const segmentUserId = instance.storage.getItem('ajs_anonymous_id');

//   if (segmentUserId) {
//     instance.identify(segmentUserId);
//     instance.storage.setItem(SEGMENT_MERGED_FLAG, 'true');
//   }
// };

// export const NinetailedSegmentPlugin = (): AnalyticsPlugin => {
//   return {
//     name: 'ninetailed:segment',
//     config: {},
//     initialize: ({ instance }) => {
//       merge(instance);
//     },
//     pageStart: ({ instance }) => {
//       merge(instance);
//     },
//     trackStart: ({ instance }) => {
//       merge(instance);
//     },
//     identifyStart: ({ instance }) => {
//       merge(instance);
//     },
//     loaded: () => true,
//   };
// };

const HAS_SEEN_COMPONENT = 'hasSeenComponent';

type NinetailedSegmentPluginOptions = {
  writeKey: string;

  actionTemplate?: string;
  categoryPropertyTemplate?: string;
  componentPropertyTemplate?: string;
  audiencePropertyTemplate?: string;
};

type TrackArgs = {
  payload: {
    event: string;
    properties?: {
      variant?: Variant<unknown>;
      audience?: { id: string };
      isPersonalized?: boolean;
    };
  };
  abort: () => string;
};

dot.templateSettings = {
  ...dot.templateSettings,
  interpolate: /{{([\s\S]+?)}}/g,
  varname: 'component, audience, isPersonalized',
};

export const NinetailedSegmentPlugin = (
  options: NinetailedSegmentPluginOptions
): AnalyticsPlugin[] => {
  const actionTemplate = dot.template(
    options.actionTemplate ||
      'Has Seen Component - Audience:{{ audience.id }}'
  );
  const categoryPropertyTemplate = dot.template(
    options.categoryPropertyTemplate || 'Ninetailed'
  );
  const componentPropertyTemplate = dot.template(
    options.componentPropertyTemplate || '{{ component.id }}'
  );
  const audiencePropertyTemplate = dot.template(
    options.audiencePropertyTemplate || '{{ audience.id }}'
  );

  const trackOverwritePlugin = {
    name: 'ninetailed:segment',
    'page:segment': ({ abort }: TrackArgs) => abort(),
    'track:segment': ({ payload, abort }: TrackArgs) => {
      const { event, properties } = payload;

      if (
        event !== HAS_SEEN_COMPONENT ||
        !properties ||
        !properties.variant ||
        !properties.audience ||
        typeof properties.isPersonalized === 'undefined'
      ) {
        return abort();
      }

      const { variant, audience, isPersonalized } = properties;
      const action = actionTemplate(variant, audience, isPersonalized);
      const categoryProperty = categoryPropertyTemplate(
        variant,
        audience,
        isPersonalized
      );
      const componentProperty = componentPropertyTemplate(
        variant,
        audience,
        isPersonalized
      );
      const audienceProperty = audiencePropertyTemplate(
        variant,
        audience,
        isPersonalized
      );

      return {
        ...payload,
        event: action,
        properties: {
          category: categoryProperty,
          component: componentProperty,
          audience: audienceProperty,
          isPersonalized,
        },
      };
    },
    'identify:segment': ({ abort }: TrackArgs) => abort(),
  };

  return [
    trackOverwritePlugin,
    segment({
      writeKey: options.writeKey,
    }),
  ];
};
