import { AnalyticsPlugin } from 'analytics';
// No types available for this library
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import googleAnalytics from '@analytics/google-analytics';
import template from 'lodash/template';
import { Variant } from '@ninetailed/experience.js-shared';

const HAS_SEEN_COMPONENT = 'hasSeenComponent';

type NinetailedGoogleAnalyticsPluginOptions = {
  trackingId: string;

  actionTemplate?: string;
  labelTemplate?: string;
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

const TEMPLATE_OPTIONS = {
  interpolate: /{{([\s\S]+?)}}/g,
};

export const NinetailedGoogleAnalyticsPlugin = (
  options: NinetailedGoogleAnalyticsPluginOptions
): AnalyticsPlugin[] => {
  const actionTemplate = template(
    options.actionTemplate || 'Has Seen Component - Audience:{{ audience.id }}',
    TEMPLATE_OPTIONS
  );
  const labelTemplate = template(
    options.labelTemplate || '{{ baselineOrVariant }}:{{ component.id }}',
    TEMPLATE_OPTIONS
  );

  const trackOverwritePlugin = {
    name: 'ninetailed:google-analytics',
    'page:google-analytics': ({ abort }: TrackArgs) => abort(),
    'track:google-analytics': ({ payload, abort }: TrackArgs) => {
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
      const action = actionTemplate({ component: variant, audience });
      const label = labelTemplate({
        component: variant,
        audience,
        baselineOrVariant: isPersonalized ? 'Variant' : 'Baseline',
      });

      return {
        ...payload,
        event: action,
        properties: {
          category: 'Ninetailed',
          label,
          nonInteraction: true,
        },
      };
    },
    'identify:google-analytics': ({ abort }: TrackArgs) => abort(),
  };

  return [
    trackOverwritePlugin,
    googleAnalytics({
      trackingId: options.trackingId,
    }),
  ];
};
