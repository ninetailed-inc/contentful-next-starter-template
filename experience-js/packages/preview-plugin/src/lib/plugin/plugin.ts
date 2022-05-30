import { AnalyticsPlugin } from 'analytics';
import { Profile } from '@ninetailed/experience.js-shared';
import union from 'lodash/union';

import { Credentials } from './types';
import { WidgetContainer } from './WidgetContainer';

declare global {
  interface Window {
    ninetailed?: any;
  }
}

export const NINETAILED_PREVIEW_EVENTS = {
  previewAudiences: 'previewAudiences',
  previewTraits: 'previewTraits',
};

type NinetailedPreviewPluginOptions = Credentials & {
  url?: string;
  environment?: string;

  ui?: {
    opener?: {
      hide: boolean;
    };
  };
};

export const NinetailedPreviewPlugin = ({
  clientId,
  secret,
  url,
  environment,
  ui,
}: NinetailedPreviewPluginOptions): AnalyticsPlugin => {
  let isOpen = false;
  let activatedAudiences: string[] = [];
  let audiences: string[] = [];
  let lastProfile: Profile;

  return {
    name: 'ninetailed:preview',
    config: {},
    initialize: ({ instance }) => {
      if (typeof window !== 'undefined') {
        const {
          PreviewBridge,
        } = require('@ninetailed/experience.js-preview-bridge');
        const container = new WidgetContainer({ ui });
        const preview = PreviewBridge({ url });
        preview.render(container.element);

        const open = () => {
          container.open();
          isOpen = true;
          instance.dispatch({ type: 'preview:change' });
        };

        const close = () => {
          container.close();
          setTimeout(() => {
            isOpen = false;
            instance.dispatch({ type: 'preview:change' });
          }, 700);
        };

        const toggle = () => {
          if (isOpen) {
            close();
          } else {
            open();
          }
        };

        const activateAudience = (id: string) => {
          activatedAudiences = union(activatedAudiences, [id]);
          instance.dispatch({
            type: 'profile',
            profile: lastProfile,
          });
        };

        const deactivateAudience = (id: string) => {
          activatedAudiences = activatedAudiences.filter(
            (activatedAudience) => activatedAudience !== id
          );
          instance.dispatch({
            type: 'profile',
            profile: lastProfile,
          });
        };

        const buildPreviewPlugin = () => ({
          open: () => open(),
          close: () => close(),
          toggle: () => toggle(),
          isOpen,
          activateAudience: (id: string) => activateAudience(id),
          deactivateAudience: (id: string) => deactivateAudience(id),
          activatedAudiences,
          audiences,
        });

        window.ninetailed = Object.assign({}, window.ninetailed, {
          plugins: {
            ...window.ninetailed?.plugins,
            preview: buildPreviewPlugin(),
          },
        });

        const buildNinetailed = () =>
          Object.assign({}, window.ninetailed, {
            version: '1.5.1',
            plugins: {
              ...window.ninetailed?.plugins,
              preview: buildPreviewPlugin(),
            },
            credentials: {
              clientId,
              secret,
              environment,
            },
          });

        instance.on('profile', () => {
          preview.updateProps({ props: buildNinetailed() });
        });

        instance.on('preview:change', () => {
          preview.updateProps({ props: buildNinetailed() });
        });
      }
    },
    profile: ({ payload }) => {
      audiences = payload?.profile?.audiences || [];
      lastProfile = payload.profile;

      return {
        ...payload,
        profile: {
          ...payload.profile,
          audiences: union(audiences, activatedAudiences),
        },
      };
    },
    loaded: () => true,
  };
};
