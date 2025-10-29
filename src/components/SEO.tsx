import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO = ({
  title,
  description,
  keywords,
  image = '/og-image.jpg',
  url = 'https://nghelabiet.ai',
}: SEOProps) => {
  const { t, i18n } = useTranslation();
  
  const defaultTitle = `${t('common.appName')} - ${t('common.tagline')}`;
  const defaultDescription = t('about.paragraph1');
  
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || 'AI, scam detection, voice analysis, lừa đảo, phát hiện lừa đảo, trí tuệ nhân tạo, bảo mật, an toàn';
  const finalImage = `${url}${image}`;
  const finalUrl = typeof window !== 'undefined' ? `${url}${window.location.pathname}` : url;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="language" content={i18n.language} />
      <meta name="author" content="NgheLaBiet.AI" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content={t('common.appName')} />
      <meta property="og:locale" content={i18n.language === 'vi' ? 'vi_VN' : 'en_US'} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#111827" />
      <link rel="canonical" href={finalUrl} />
      <html lang={i18n.language} />
    </Helmet>
  );
};

