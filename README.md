# A Ninetailed website demonstration showcasing content personalization with Contentful and Next.js
<!-- A website demonstration showcasing Ninetailed's personalization integration for Contentful with Next.js
   -->
![](docs/ninetailed-contentful-next-starter-screenshot.png)

This website example demonstrates the Ninetailed content personalization integration for Contentful using Next.js as the web framework.

- [Deploy your own](#Deploy-your-own)
- [Prerequisites](#Prerequisites)
  - [User account registration](#user-account-registration)

## Deploy your own

If you are interested in exploring the capabilities of content personalization with Ninetailed and Contentful in more depth you can deploy your own instance on Vercel by pressing this button.\

Before deploying, please read through the [Prerequisites and how-to](#Prerequisites-and-how-to) section as it describes mandatory steps to get the required credentials for the automatic deployment via Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fninetailed-inc%2Fcontentful-next-starter-CSR&env=NEXT_PUBLIC_NINETAILED_CLIENT_ID,NEXT_PUBLIC_NINETAILED_MANAGEMENT_CLIENT_ID,NEXT_PUBLIC_NINETAILED_MANAGEMENT_SECRET,CONTENTFUL_SPACE_ID,CONTENTFUL_TOKEN,CONTENTFUL_PREVIEW_TOKEN,CONTENTFUL_MANAGEMENT_TOKEN&project-name=ninetailed-contentful-next-starter&repository-name=ninetailed-contentful-next-starter&build-command=npm%20run%20build-and-setup)

## Prerequisites and how-to
Before exploring the content personalization demo by your own, read carefully through this section.

### User account registration
Register a user account with the following online services if you do not already have one.:
- [create an account on Github](https://github.com/signup).
- [create an account on Contentful](https://www.contentful.com/sign-up/).
- [create an account on Ninetailed](https://app.ninetailed.io/account/sign-up).


## Live demo

No Demo Yet

## Installation Guide

<!--Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example)-->

### Prerequisite

#### Sign up on Ninetailed and Contentful

Before you start with the automatic rollout, we need you to 
For an automatic rollout, you should make a account on vercel and contentful

First, sign up at https://app.ninetailed.io/

contetnfull
https://be.contentful.com/login

#### Connecting Ninetailed with Contentful


within contentfull go to apps-> manage apps and brows for Ninetailed Personalization
- in the modal click install
- Authorize access of the Ninetailed Personalization app in your space
- Connect to Ninetailed
- if you dont have an account, please sign up
- In the Ninetailed App go to connection and set up your first
- select contentful and authenticate
- next click onto the connection and create the content source

#### API keys and credentials

At ninetailed:
Apikey -> Apikey = NEXT_PUBLIC_NINETAILED_CLIENT_ID
Settings -> Api Tokens -> Generate Token -> Roles = Readonly => Client ID = NEXT_PUBLIC_NINETAILED_MANAGEMENT_CLIENT_ID & Secret Key = NEXT_PUBLIC_NINETAILED_MANAGEMENT_SECRET

At Contentfull
Setting -> API key -> on Content delivery / preview tokens press Add API Key !!!Save
Setting -> API key -> on Content management tokens -> Generate Personal Token

Before we can start with the automatic deploy


Nientailed account
Contentful account



#### Vercel

#### Contentful

Master Branch

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fninetailed-inc%2Fcontentful-next-starter-CSR&env=NEXT_PUBLIC_NINETAILED_CLIENT_ID,NEXT_PUBLIC_NINETAILED_MANAGEMENT_CLIENT_ID,NEXT_PUBLIC_NINETAILED_MANAGEMENT_SECRET,CONTENTFUL_SPACE_ID,CONTENTFUL_TOKEN,CONTENTFUL_PREVIEW_TOKEN,CONTENTFUL_MANAGEMENT_TOKEN&project-name=ninetailed-contentful-next-starter&repository-name=ninetailed-contentful-next-starter&build-command=npm%20run%20build-and-setup)

Testing Branch

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fninetailed-inc%2Fcontentful-next-starter-CSR%2Ftree%2Ftesting_deploy-routine&env=NEXT_PUBLIC_NINETAILED_CLIENT_ID,NEXT_PUBLIC_NINETAILED_MANAGEMENT_CLIENT_ID,NEXT_PUBLIC_NINETAILED_MANAGEMENT_SECRET,CONTENTFUL_SPACE_ID,CONTENTFUL_TOKEN,CONTENTFUL_PREVIEW_TOKEN,CONTENTFUL_MANAGEMENT_TOKEN&project-name=ninetailed-contentful-next-starter&repository-name=ninetailed-contentful-next-starter&build-command=npm%20run%20build-and-setup)


Change the build command on vercel if you like to make changes in the code base
-..and disable the ovverride in the setting section of you project in vercel

## Developer Section

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

```bash
NEXT_PUBLIC_NINETAILED_CLIENT_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
NEXT_PUBLIC_NINETAILED_ENVIRONMENT=main
NEXT_PUBLIC_NINETAILED_MANAGEMENT_CLIENT_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
NEXT_PUBLIC_NINETAILED_MANAGEMENT_SECRET=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

CONTENTFUL_SPACE_ID=XXXXXXXXXXXX
CONTENTFUL_TOKEN=XXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXX_XX
CONTENTFUL_PREVIEW_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CONTENTFUL_MANAGEMENT_TOKEN=XXXXX-XXXXX-XXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_SPACE_DATA_LOCATION=path/to/your/jsonData.json
```

### Contentful

#### Export and Import to your Contentfull space

```bash
npm run setup
# or
yarn setup

npm run export
# or
yarn export
```

#### Advanced Features

```bash
npm run contentful-typescript-codegen
# or
yarn contentful-typescript-codegen

```



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Troubeshooting
