import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import get from 'lodash/get';

import { useProfile } from '@ninetailed/experience.js-next';
import { BlockRenderer } from '@/components/Renderer';
import { getPagesOfType, getPage } from '@/lib/api';
import { PAGE_CONTENT_TYPES } from '@/lib/constants';
import { IPage } from '@/types/contentful';

const Page = ({ page }: { page: IPage }) => {
  const { loading, profile, error } = useProfile();
  console.log({ 'SLUG:useProfile': profile });
  if (!page) {
    return null;
  }
  const {
    banner,
    navigation,
    sections = [],
    footer,
  } = page.fields.content.fields;

  return (
    <>
      <NextSeo
        title={page.fields.seo?.fields.title || page.fields.title}
        description={page.fields.seo?.fields.description}
        nofollow={page.fields.seo?.fields.no_follow as boolean}
        noindex={page.fields.seo?.fields.no_index as boolean}
      />
      <div className="w-full">
        {banner && <BlockRenderer block={banner} />}
        {navigation && <BlockRenderer block={navigation} />}
        <main>
          <BlockRenderer block={sections} />
        </main>

        {footer && <BlockRenderer block={footer} />}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  console.log({ 'SLUG:params': params });
  const rawSlug = get(params, 'slug', []) as string[];
  console.log({ 'SLUG:rawSlug': rawSlug });
  const audiencesSlug = rawSlug[0] || '';
  const isPersonalized = audiencesSlug.startsWith(';');
  const audiences = isPersonalized
    ? audiencesSlug.split(';')[1].split(',')
    : [];
  const slug = isPersonalized ? rawSlug.slice(1).join('/') : rawSlug.join('/');
  const page = await getPage({
    preview,
    slug: slug === '' ? '/' : slug,
    pageContentType: PAGE_CONTENT_TYPES.PAGE,
    childPageContentType: PAGE_CONTENT_TYPES.LANDING_PAGE,
  });
  /* console.log({ 'SLUG:page': page }); */
  return {
    props: { page, ninetailed: { audiences } },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPagesOfType({
    pageContentType: PAGE_CONTENT_TYPES.PAGE,
    childPageContentType: PAGE_CONTENT_TYPES.LANDING_PAGE,
  });

  const paths = pages
    .filter((page) => {
      return page.fields.slug !== '/';
    })
    .map((page) => {
      return {
        params: { slug: page.fields.slug.split('/') },
      };
    });
  /* console.log({ 'SLUG:paths': JSON.stringify(paths) }); */
  /* return {
    paths: [
      { params: { slug: [''] } },
      { params: { slug: [';7IRVaTD9GpZVprP7A8tSiE', 'pricing'] } },
    ],
    fallback: true,
  }; */
  /* return {
    paths: [{ params: { slug: [''] } }, { params: { slug: ['pricing'] } }],
    fallback: true,
  }; */
  return {
    paths: [...paths, { params: { slug: [''] } }],
    fallback: true,
  };
};

export default Page;
