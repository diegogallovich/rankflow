import { Organization } from 'schema-dts';

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RankFlow',
  url: 'https://rankflow.ai',
  logo: 'https://rankflow.ai/logotype-dark.png',
  //   sameAs: [
  //     "https://twitter.com/rankflow",
  //     "https://www.linkedin.com/company/rankflow",
  //     // Add other social media profiles here
  //   ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-914-608-4742',
    contactType: 'Founder',
    email: 'contact@rankflow.ai',
    availableLanguage: ['English', 'Spanish'],
  },
  description:
    "RankFlow is a tool that allows you to use AI with Webflow's CMS to get better search results.",
} as Organization;

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
    />
  );
}
