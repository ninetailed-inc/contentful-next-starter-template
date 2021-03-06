// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface IBannerFields {
  /** Internal title */
  internalTitle: string;

  /** Text */
  text: Document;

  /** Link text */
  linkText: string;

  /** slug */
  slug: string;

  /** Variants */
  nt_variants?: IBanner[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface IBanner extends Entry<IBannerFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'banner';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IBlockParagraphFields {
  /** Internal name */
  internalName?: string | undefined;

  /** Text */
  text: Document;

  /** Variants */
  nt_variants?: IBlockParagraph[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface IBlockParagraph extends Entry<IBlockParagraphFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'blockParagraph';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IButtonFields {
  /** Internal name */
  internalName: string;

  /** Button text */
  buttonText: string;

  /** Icon */
  icon?: Asset | undefined;

  /** Variant */
  variant: 'primary' | 'secondary';

  /** slug */
  slug: string;

  /** Variants */
  nt_variants?: IButton[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface IButton extends Entry<IButtonFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'button';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ICtaFields {
  /** Internal name */
  internalName: string;

  /** Headline */
  headline: Document;

  /** Subline */
  subline?: Document | undefined;

  /** Buttons */
  buttons?: IButton[] | undefined;

  /** Variants */
  nt_variants?: ICta[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface ICta extends Entry<ICtaFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'cta';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IFeatureFields {
  /** Internal name */
  internalName?: string | undefined;

  /** Headline */
  headline: Document;

  /** Subline */
  subline?: Document | undefined;

  /** Button */
  button?: IButton[] | undefined;

  /** Image */
  image: Asset;

  /** Image position */
  imagePosition?: 'right' | 'left' | undefined;

  /** Variants */
  nt_variants?: IFeature[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface IFeature extends Entry<IFeatureFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'feature';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IFooterFields {
  /** Internal title */
  internalTitle: string;

  /** Footer links */
  footerLinks: IButton[];

  /** Copyright */
  copyright: Document;

  /** Variants */
  nt_variants?: IFooter[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface IFooter extends Entry<IFooterFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'footer';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IFormFields {
  /** Internal Name */
  internalName: string;

  /** Hubspot Form ID */
  hubspotFormId: string;

  /** Hubspot Portal ID */
  hubspotPortalId: string;

  /** Hubspot Portal Region */
  hubspotPortalRegion: string;

  /** Variants */
  nt_variants?: IForm[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface IForm extends Entry<IFormFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'form';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IHeroFields {
  /** Internal name */
  internalName?: string | undefined;

  /** Headline */
  headline: Document;

  /** Subline */
  subline?: Document | undefined;

  /** Buttons */
  buttons?: IButton[] | undefined;

  /** Image */
  image: Asset;

  /** Variants */
  nt_variants?: IHero[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface IHero extends Entry<IHeroFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'hero';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ILandingPageFields {
  /** Internal Name */
  name?: string | undefined;

  /** Banner */
  banner?: IBanner | undefined;

  /** Navigation */
  navigation?: INavigation | undefined;

  /** Sections */
  sections: (ICta | IFeature | IForm | IHero | IPricingTable)[];

  /** Footer */
  footer?: IFooter | undefined;

  /** Variants */
  nt_variants?: ILandingPage[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface ILandingPage extends Entry<ILandingPageFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'landingPage';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IListElementFields {
  /** Internal name */
  internalName?: string | undefined;

  /** Icon */
  icon?: Asset | undefined;

  /** Text */
  text: Document;

  /** Variants */
  nt_variants?: IListElement[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface IListElement extends Entry<IListElementFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'listElement';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface INavigationFields {
  /** Internal title */
  internalTitle?: string | undefined;

  /** Navigation links */
  navigationLinks: IButton[];

  /** Variants */
  nt_variants?: INavigation[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface INavigation extends Entry<INavigationFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'navigation';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface INtAudienceFields {
  /** Name */
  nt_name: string;

  /** Description */
  nt_description?: string | undefined;

  /** Rules */
  nt_rules: Record<string, any>;

  /** Audience Id */
  nt_audience_id: string;
}

/** Ninetailed Audience */

export interface INtAudience extends Entry<INtAudienceFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'nt_audience';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface INtMergetagFields {
  /** Name */
  nt_name: string;

  /** Fallback */
  nt_fallback?: string | undefined;

  /** Merge Tag Id */
  nt_mergetag_id: string;
}

/** Ninetailed Merge Tag */

export interface INtMergetag extends Entry<INtMergetagFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'nt_mergetag';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IPageFields {
  /** Internal name */
  name: string;

  /** Page title */
  title: string;

  /** Slug */
  slug: string;

  /** SEO metadata */
  seo?: ISeo | undefined;

  /** Content */
  content: ILandingPage;

  /** Variants */
  nt_variants?: IPage[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

/** Represents a web page in Compose. DO NOT DELETE */

export interface IPage extends Entry<IPageFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'page';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IPricingPlanFields {
  /** Internal name */
  internalName?: string | undefined;

  /** Title */
  title: Document;

  /** Price */
  price: Document;

  /** Frequency */
  frequency?: '/month' | '/week' | '/day' | undefined;

  /** Discounted price */
  discountedPrice?: Document | undefined;

  /** Description */
  description?: Document | undefined;

  /** Button */
  button: IButton;

  /** Most popular */
  mostPopular?: boolean | undefined;

  /** Variants */
  nt_variants?: IPricingPlan[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface IPricingPlan extends Entry<IPricingPlanFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'pricingPlan';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IPricingTableFields {
  /** Internal name */
  internalName?: string | undefined;

  /** Headline */
  headline: Document;

  /** Subline */
  subline: Document;

  /** Pricing plans */
  pricingPlans: IPricingPlan[];

  /** Variants */
  nt_variants?: IPricingTable[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface IPricingTable extends Entry<IPricingTableFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'pricingTable';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ISeoFields {
  /** Internal name */
  name: string;

  /** SEO title */
  title?: string | undefined;

  /** Description */
  description?: string | undefined;

  /** Keywords */
  keywords?: string[] | undefined;

  /** Hide page from search engines (noindex) */
  no_index?: boolean | undefined;

  /** Exclude links from search rankings? (nofollow) */
  no_follow?: boolean | undefined;

  /** Variants */
  nt_variants?: ISeo[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

/** SEO Metadata for web pages in Compose. DO NOT DELETE */

export interface ISeo extends Entry<ISeoFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'seo';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ITestFields {
  /** title */
  title?: string | undefined;

  /** Variants */
  nt_variants?: ITest[] | undefined;

  /** Audience */
  nt_audience?: INtAudience | undefined;
}

export interface ITest extends Entry<ITestFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'test';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export type CONTENT_TYPE =
  | 'banner'
  | 'blockParagraph'
  | 'button'
  | 'cta'
  | 'feature'
  | 'footer'
  | 'form'
  | 'hero'
  | 'landingPage'
  | 'listElement'
  | 'navigation'
  | 'nt_audience'
  | 'nt_mergetag'
  | 'page'
  | 'pricingPlan'
  | 'pricingTable'
  | 'seo'
  | 'test';

export type LOCALE_CODE = 'en-US';

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US';
