import Head from "next/head";
import { useRouter } from "next/router";

const defaultMeta = {
  title: "Dropzhip Indonesia",
  siteName: "Dropzhip Indonesia",
  description: "",
  url: "https://dropzhip.co.id/",
  type: "website",
  robots: "follow, index",
  image: "",
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta["title"] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content={meta.robots} />
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${meta.url}${router.asPath}`} />
      <link rel="canonical" href={`${meta.url}${router.asPath}`} />
      {/* Open Graph */}
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta name="image" property="og:image" content={meta.image} />
      {meta.date && (
        <>
          <meta property="article:published_time" content={meta.date} />
          <meta
            name="publish_date"
            property="og:publish_date"
            content={meta.date}
          />
          <meta name="author" property="article:author" content="Sonar 360" />
        </>
      )}

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/favicon.ico" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}

type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

// !STARTERCONF this is the default favicon, you can generate your own from https://www.favicon-generator.org/ then replace the whole /public/favicon folder
const favicons: Array<Favicons> = [
  {
    rel: "apple-touch-icon",
    sizes: "57x57",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    sizes: "60x60",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    sizes: "72x72",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    sizes: "76x76",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    sizes: "114x114",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    sizes: "120x120",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    sizes: "144x144",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    sizes: "152x152",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicon.ico",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    href: "/favicon.ico",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon.ico",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "96x96",
    href: "/favicon.ico",
  },
  {
    rel: "icon",
    type: "image/png",
    href: "/favicon.ico",
    sizes: "16x16",
  },
];
