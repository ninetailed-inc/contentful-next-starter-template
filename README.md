# Ninetailed Contentful-Next-Starter

## Deploy your own on Vercel

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example)

<!---[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fninetailed-inc%2Fcontentful-next-starter%2Ftree%2Fdevelopment&project-name=ninetailed-contentful-next-starter&repository-name=ninetailed-contentful-next-starter&integration-ids=oac_aZtAZpDfT1lX3zrnWy7KT9VA)-->
<!---[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fninetailed-inc%2Fcontentful-next-starter-CSR&project-name=ninetailed-contentful-next-starter&repository-name=ninetailed-contentful-next-starter&integration-ids=oac_aZtAZpDfT1lX3zrnWy7KT9VA)-->
<!---[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fninetailed-inc%2Fcontentful-next-starter-CSR&env=TESTKEY1,TESTKEY2&project-name=contentful-next-starter&repository-name=contentful-next-starter)-->

## Master Branch
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fninetailed-inc%2Fcontentful-next-starter-CSR&env=NEXT_PUBLIC_NINETAILED_CLIENT_ID,NEXT_PUBLIC_NINETAILED_MANAGEMENT_CLIENT_ID,NEXT_PUBLIC_NINETAILED_MANAGEMENT_SECRET,CONTENTFUL_SPACE_ID,CONTENTFUL_TOKEN,CONTENTFUL_PREVIEW_TOKEN,CONTENTFUL_MANAGEMENT_TOKEN&project-name=ninetailed-contentful-next-starter&repository-name=ninetailed-contentful-next-starter&build-command=npm%20run%20vercel-build)

## Testing Branch
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fninetailed-inc%2Fcontentful-next-starter-CSR%2Ftree%2Ftesting_deploy-routine&env=NEXT_PUBLIC_NINETAILED_CLIENT_ID,NEXT_PUBLIC_NINETAILED_MANAGEMENT_CLIENT_ID,NEXT_PUBLIC_NINETAILED_MANAGEMENT_SECRET,CONTENTFUL_SPACE_ID,CONTENTFUL_TOKEN,CONTENTFUL_PREVIEW_TOKEN,CONTENTFUL_MANAGEMENT_TOKEN&project-name=ninetailed-contentful-next-starter&repository-name=ninetailed-contentful-next-starter&build-command=npm%20run%20build-and-setup)



## Setting Up Contentful



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

```bash
NEXT_PUBLIC_NINETAILED_CLIENT_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
X NEXT_PUBLIC_NINETAILED_ENVIRONMENT=main
NEXT_PUBLIC_NINETAILED_MANAGEMENT_CLIENT_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
NEXT_PUBLIC_NINETAILED_MANAGEMENT_SECRET=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

CONTENTFUL_SPACE_ID=XXXXXXXXXXXX
CONTENTFUL_TOKEN=XXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXX_XX
X CONTENTFUL_PREVIEW_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CONTENTFUL_MANAGEMENT_TOKEN=XXXXX-XXXXX-XXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X CONTENTFUL_ENVIRONMENT=master
X CONTENTFUL_SPACE_DATA_LOCATION=path/to/your/jsonData.json
```

```bash
npm run dev
# or
yarn dev

npm run contentful-typescript-codegen
# or
yarn contentful-typescript-codegen

npm run setup
# or
yarn setup

npm run export
# or
yarn export
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
