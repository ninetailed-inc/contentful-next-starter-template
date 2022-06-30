import React from 'react';
import * as Contentful from 'contentful';
import get from 'lodash/get';
import {
  Personalize,
  Variant,
  PersonalizedComponent,
} from '@ninetailed/experience.js-next';

import { Hero } from '@/components/Hero';
import { CTA } from '@/components/Cta';
import { Feature } from '@/components/Feature';
import { Banner } from '@/components/Banner';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PricingTable } from '@/components/PricingTable';
import { PricingPlan } from '@/components/PricingPlan';
import { Form } from '@/components/Form';

import { ComponentContentTypes } from '@/lib/constants';

const ContentTypeMap = {
  [ComponentContentTypes.Hero]: Hero,
  [ComponentContentTypes.CTA]: CTA,
  [ComponentContentTypes.Feature]: Feature,
  [ComponentContentTypes.Banner]: Banner,
  [ComponentContentTypes.Navigation]: Navigation,
  [ComponentContentTypes.Footer]: Footer,
  [ComponentContentTypes.PricingPlan]: PricingPlan,
  [ComponentContentTypes.PricingTable]: PricingTable,
  [ComponentContentTypes.Form]: Form,
};

type PersonalizedFields<T> = T & {
  nt_variants?: Contentful.Entry<{
    nt_audience?: Contentful.Entry<{
      id: Contentful.EntryFields.Symbol;
    }>;
  }>[];
};

type Block = Contentful.Entry<PersonalizedFields<any>> & {
  parent?: Contentful.Entry<any>;
};

type BlockRendererProps = {
  block: Block | Block[];
};

const unwrapVariants = (
  block: Contentful.Entry<PersonalizedFields<Block>>
): Variant<any>[] => {
  return (block.fields.nt_variants || [])
    .filter((variant) => {
      return !!variant.fields?.nt_audience;
    })
    .map((variant) => {
      return {
        id: variant.sys.id,
        audience: {
          id: variant.fields.nt_audience?.sys.id,
        },
        ...variant,
      };
    });
};

const BlockRenderer = ({ block }: BlockRendererProps) => {
  if (Array.isArray(block)) {
    return (
      <>
        {block.map((b) => {
          return <BlockRenderer key={`block-${b.sys.id}`} block={b} />;
        })}
      </>
    );
  }

  const contentTypeId = get(block, 'sys.contentType.sys.id') as string;
  const Component = ContentTypeMap[contentTypeId];

  if (!Component) {
    console.warn(`${contentTypeId} can not be handled`);
    return null;
  }

  const { id } = block.sys;

  const componentProps = {
    ...block,
    parent: block.parent,
  };
  return (
    <div key={`${contentTypeId}-${id}`}>
      <Personalize
        {...componentProps}
        id={componentProps.sys.id}
        component={Component as PersonalizedComponent<any>}
        variants={unwrapVariants(componentProps)}
      />
    </div>
  );
};

export { BlockRenderer };
