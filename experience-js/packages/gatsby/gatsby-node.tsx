import { PluginOptionsSchemaArgs, CreateWebpackConfigArgs } from 'gatsby';
import { ObjectSchema } from 'gatsby-plugin-utils';
import path from 'path';

export const pluginOptionsSchema = ({
  Joi,
}: PluginOptionsSchemaArgs): ObjectSchema<any> => {
  return Joi.object({
    clientId: Joi.string()
      .required()
      .description("Your organizations' client id.")
      .messages({
        'any.required':
          '"clientId" needs to be specified. Get your clientId from the dashboard.',
      }),
    ninetailedPlugins: Joi.array(),
  });
};

import { PluginOptions } from './plugin-options';

/**
 * Add the webpack config for loading MDX files
 */
export const onCreateWebpackConfig = (
  { loaders, actions }: CreateWebpackConfigArgs,
  pluginOptions: PluginOptions
) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        path: false,
        crypto: false,
      },
    },
    module: {
      rules: [
        {
          test: /ninetailed-plugins\.js$/,
          include: __dirname,
          use: [
            loaders.js(),
            {
              loader: path.join(
                __dirname,
                `loaders`,
                `ninetailed-plugins`
              ),
              options: {
                plugins: pluginOptions.ninetailedPlugins,
              },
            },
          ],
        },
      ],
    },
  });
};
