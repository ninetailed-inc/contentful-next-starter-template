import React from 'react';
import { WrapRootElementBrowserArgs } from 'gatsby';
import { NinetailedProvider } from '@ninetailed/experience.js-react';

import { Tracker } from './src/lib/Tracker';
import { PluginOptions } from './plugin-options';

//@ts-ignore
import { plugins as ninetailedPlugins } from './loaders/ninetailed-plugins';

const WrapRootElement: React.FC<PluginOptions> = ({ children, ...options }) => {
  const resolvedPlugins = ninetailedPlugins.map(({ plugin, options }) => plugin(options));

  return (
    <NinetailedProvider
      {...options}
      plugins={resolvedPlugins}
    >
      <Tracker />
      {children}
    </NinetailedProvider>
  );
};

export const wrapRootElement = (
  args: WrapRootElementBrowserArgs,
  options: PluginOptions
) => {
  const { element } = args;

  return <WrapRootElement {...options}>{element}</WrapRootElement>;
};
