import React from "react";
import Head from "next/head";

type MetaProps = {
  title?: string;
  description?: string;
  url?: string;
  url_image?: string;
};

const Meta: React.FC<MetaProps> = ({ title, description, url, url_image }) => {
  return (
    <Head>
      <meta property="og:type" content="website" />

      {title && (
        <>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta property="og:title" content={title} />
          <meta property="twitter:title" content={title} />
        </>
      )}

      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="twitter:description" content={description} />
        </>
      )}

      {url && (
        <>
          <meta property="og:url" content={url} />
          <meta property="twitter:url" content={url} />
        </>
      )}

      {url_image && (
        <>
          <meta property="og:image" content={url_image} />
          <meta property="twitter:image" content={url_image} />
          <meta property="twitter:card" content="summary_large_image" />
        </>
      )}
    </Head>
  );
};

export default Meta;
