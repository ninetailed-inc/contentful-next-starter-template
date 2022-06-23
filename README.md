#  A website template for Ninetailed personalization with contentful and next.js

![](docs/ninetailed-contentful-next-starter-screenshot.png)

This website example demonstrates the Ninetailed content personalization integration for Contentful using Next.js as the web framework.

- [Live Demo](#Live Demo)
- [Deploy Your Own Playground Without Code](#Deploy Your Own Playground Without Code)
  - [Create a Ninetailed account](#Step 1.-Create a Ninetailed account)
  - [Create a Contentful account and space](#Step 2.-Create a Contentful account and space)
  - [Connect Contentful with Ninetailed](#Step 3.-Connect Contentful with Ninetailed)
  - [Create Contentful API credentials ](#Step 4.-Create Contentful API credentials)
  - [Create Ninetailed API credentials ](#Step 5.-Create Ninetailed API credentials)
- [Developer Section](#Developer Section)


## Live Demo

If you like to discover how content personalization can be applied to a website visit our live demo here.

## Deploy Your Own Playground Without Code
If you are interested in exploring the capabilities of content personalization with Ninetailed and Contentful in more depth you can deploy your own environment.
For that, simply follow the instructions which will guide you through the necessary steps.

### Step 1. Create a Ninetailed account
- [Click here to sign-up on Ninetailed](https://app.ninetailed.io/account/sign-up).

### Step 2. Create a Contentful account and space
- First, [sign-up on Contentful](https://www.contentful.com/sign-up/).
- Next, create a new empty **space** from the Contentful dashboard. You can choose any name of your liking for the space.

### Step 3. Connect Contentful with Ninetailed
- Within your Contentful space, navigate to **Apps** in the navbar and click on **manage apps** in the dropdown.
- On the next page, scroll down the provided list of available apps and click on the **Ninetailed Personalization** application.
- Install the Ninetailed Personalization application and authorize access to your space.
- Afterwards simply click on connect. You will be automatically redirected to your Ninetailed account.
- Next, authenticate with Contentful
- At last, select the Contentful space you want to connect to Ninetailed, provide a name for the connection and confirm with **create content source**.

### Step 4. Create Contentful API credentials
> ⚠️ **HINT:** Save the created API credentials temporarily in a note or separate file, as you will need to provide them in the last step.
- Within your Contentful space, navigate to the navigation bar, go to **Settings** and click on **API keys** in the dropdown.
- Click on **Add API key**.
- Enter a name for your API key and save it. 
- Save the **Space ID**, **Content Delivery API - access token** and **Content Preview API - access token** for later use.
- Go back and select the **Content management tokens** tab.
- Generate a **Personal Access Token** and make sure to copy it immediately to your note.

### Step 5. Create Ninetailed API credentials
> ⚠️ **HINT:** Save the created API credentials temporarily in a note or separate file, as you will need to provide them in the last step.


### Step X. Deploy your personal playground on Vercel

As the last step, click ob the deploy button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fninetailed-inc%2Fcontentful-next-starter-CSR&env=NEXT_PUBLIC_NINETAILED_CLIENT_ID,NEXT_PUBLIC_NINETAILED_MANAGEMENT_CLIENT_ID,NEXT_PUBLIC_NINETAILED_MANAGEMENT_SECRET,CONTENTFUL_SPACE_ID,CONTENTFUL_TOKEN,CONTENTFUL_PREVIEW_TOKEN,CONTENTFUL_MANAGEMENT_TOKEN&project-name=ninetailed-contentful-next-starter&repository-name=ninetailed-contentful-next-starter&build-command=npm%20run%20build-and-setup)

You will need to enter the required Api keys and tokens in the following form
Here an example:

```bash
NEXT_PUBLIC_NINETAILED_CLIENT_ID = "API Key"
NEXT_PUBLIC_NINETAILED_MANAGEMENT_CLIENT_ID = "API Token - Client ID"
NEXT_PUBLIC_NINETAILED_MANAGEMENT_SECRET = "API Token - Secret Key"
CONTENTFUL_SPACE_ID = "Space ID"
CONTENTFUL_TOKEN = "Content Delivery API - access token"
CONTENTFUL_PREVIEW_TOKEN = "Content Preview API - access token"
CONTENTFUL_MANAGEMENT_TOKEN= "Personal Access Token"
```


## Prerequisites
Before exploring the content personalization demo by your own, read carefully through this section.

**CAUTION ⚠️**: NOTE THIS KEY FOR LATER USE

### User Account Registration
Register a user account within the following online services if you do not already have one:
- [Create an account on GitHub](https://github.com/signup).
- [Create an account on Contentful](https://www.contentful.com/sign-up/).
- [Create an account on Ninetailed](https://app.ninetailed.io/account/sign-up).

<!-- side note, for typing in the keys-->


### Deployment Guide

Inorder to automatically deploy your own playgound you need required and safety-relevant credential




Important Note:
If you like to make changes to 


## Developer Section


<!-- XXXXXXXXXXXXXXXXXX -->


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

## Developer Sectionn

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
