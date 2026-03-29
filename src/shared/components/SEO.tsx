import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
}

export const SEO = ({ title, description }: SEOProps) => {
  const { t } = useTranslation();
  
  useEffect(() => {
    // Set Document Title
    const baseTitle = t('app.title', 'Vishwakarma Knowledge Centre');
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    // Set Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || t('app.description', 'Dedicated to the recognition, skill upgradation, and holistic support of traditional artisans.'));
    }

    // Set Open Graph Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title || baseTitle);
    }
  }, [title, description, t]);

  return null;
};
