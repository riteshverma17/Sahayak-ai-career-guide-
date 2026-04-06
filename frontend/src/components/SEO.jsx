import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url }) => {
  const siteTitle = title ? `${title} | Sahayak` : 'Sahayak | Find Your Path';
  const siteDescription = description || "Sahayak helps students find the best colleges, resources, and career assessments. Discover your ideal educational journey today.";
  const siteKeywords = keywords || "career assessment, college directory, educational resources, student guidance, career planning";
  const siteUrl = url || "https://sahayak.live/";

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
    </Helmet>
  );
};

export default SEO;
