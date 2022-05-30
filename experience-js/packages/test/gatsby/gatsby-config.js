module.exports = {
  siteMetadata: {
    title: `gastby`,
    description: `This is a gatsby application created by Nx.`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        svgo: false,
        ref: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: require.resolve(`@nrwl/gatsby/plugins/nx-gatsby-ext-plugin`),
      options: {
        path: __dirname,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gastby`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`,
      },
    },
    {
      // resolve: require.resolve(`../../../dist/packages/gatsby`),
      resolve: `@ninetailed/experience.js-gatsby`,
      options: {
        clientId: "d6b38b25-9646-41eb-8492-8cc7b3508202",
        ninetailedPlugins: [
          {
            resolve: "@ninetailed/experience.js-plugin-preview",
            options: {
              clientId: "237264f6-5ec2-4450-b9f5-fcabf526addc",
              secret: "4b1c93a9-7dfe-4793-84f0-e9facec2f875",
            },
          },
        ],
      },
    },
  ],
}
