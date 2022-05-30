import type { PluginOptions as GatsbyPluginOptions } from 'gatsby';
import type { NinetailedProviderProps } from '@ninetailed/experience.js-react';

export type PluginOptions = GatsbyPluginOptions & NinetailedProviderProps & {
    ninetailedPlugins?: {
        resolve: string;
        options: unknown;
    }[]
};