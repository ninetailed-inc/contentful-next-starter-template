import React from 'react';
import { WrapRootElementNodeArgs } from 'gatsby';
import { NinetailedProvider } from '@ninetailed/experience.js-react';

import { PluginOptions } from './plugin-options';

//@ts-ignore
import { plugins as ninetailedPlugins } from './loaders/ninetailed-plugins';

export const wrapRootElement = (
  args: WrapRootElementNodeArgs,
  options: PluginOptions
) => {
  const resolvedPlugins = ninetailedPlugins.map(({ plugin, options }) => plugin(options));
  const { element } = args;

  return <NinetailedProvider {...options} plugins={resolvedPlugins}>{element}</NinetailedProvider>;
};