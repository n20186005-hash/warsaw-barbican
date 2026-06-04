import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = 'https://warsawbarbican.com';

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const plUrl = `${baseUrl}/pl`;
  const ruUrl = `${baseUrl}/ru`;
  const deUrl = `${baseUrl}/de`;
  
  let selfUrl = zhUrl;
  let htmlLang = 'zh-CN';
  let ogLocale = 'zh_CN';
  
  switch (locale) {
    case 'en':
      selfUrl = enUrl;
      htmlLang = 'en';
      ogLocale = 'en_US';
      break;
    case 'pl':
      selfUrl = plUrl;
      htmlLang = 'pl';
      ogLocale = 'pl_PL';
      break;
    case 'ru':
      selfUrl = ruUrl;
      htmlLang = 'ru';
      ogLocale = 'ru_RU';
      break;
    case 'de':
      selfUrl = deUrl;
      htmlLang = 'de';
      ogLocale = 'de_DE';
      break;
  }

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'pl': plUrl,
        'ru': ruUrl,
        'de': deUrl,
        'x-default': zhUrl,
      },
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: "Warsaw Barbican Travel Guide",
      locale: ogLocale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  let htmlLang = 'zh-CN';
  switch (locale) {
    case 'en': htmlLang = 'en'; break;
    case 'pl': htmlLang = 'pl'; break;
    case 'ru': htmlLang = 'ru'; break;
    case 'de': htmlLang = 'de'; break;
  }

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
