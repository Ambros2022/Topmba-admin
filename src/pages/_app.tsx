/* eslint-disable @next/next/no-sync-scripts */
// ** React Imports
import { ReactNode, useEffect } from 'react';

// ** Next Imports
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';



// ** Loader Import
import NProgress from 'nprogress';

// ** Emotion Imports
import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';

// ** Config Imports
import themeConfig from 'src/configs/themeConfig';

// ** Fake-DB Import
// import 'src/@fake-db';

// ** Third Party Import
// import { Toaster } from 'react-hot-toast';

// ** Component Imports
// import UserLayout from 'src/layouts/UserLayout';
import ThemeComponent from 'src/@core/theme/ThemeComponent';
import AuthGuard from 'src/@core/components/auth/AuthGuard';
import GuestGuard from 'src/@core/components/auth/GuestGuard';

import Script from 'next/script';

// ** Spinner Import
import Spinner from 'src/@core/components/spinner';

// ** Contexts
import { AuthProvider } from 'src/context/AuthContext'; // Rename AuthProvider from your context
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider

// ** Styled Components
// import ReactHotToast from 'src/@core/styles/libs/react-hot-toast';

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache';

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css';

import 'src/iconify-bundle/icons-bundle-react';

import 'bootstrap-icons/font/bootstrap-icons.css';
// ** Global css styles
import '../../styles/globals.css';


// ** Bootstrap css and js
import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic';
const UserLayout = dynamic(() => import('src/layouts/UserLayout'), {
  ssr: false,
  loading: () => <Spinner />,
});


// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
  }
};


// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false;
  const router = useRouter();

  const isAdminRoute = router.pathname.startsWith('/app/dashboard') || router.pathname.startsWith('/admin');

  const getLayout =
    Component.getLayout ??
    (page =>
      isAdminRoute
        ? <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>
        : <>{page}</>);
  // const getLayout =
  //   Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>);

  const setConfig = Component.setConfig ?? undefined;
  const authGuard = Component.authGuard ?? true;
  const guestGuard = Component.guestGuard ?? false;


  
  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Study in India | Study Abroad | Learntech Edu Solutions</title>
          <meta name='keywords' content='Learntechweb' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <meta name="google-site-verification" content="aiQptX_T_B2qlVcsMutbgRfaKWPDPPLANQi297oo8dA" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "Learntech Edu Solutions Pvt. Ltd.",
                  "alternateName": "Learntech Edu Solutions",
                  "url": `${process.env.NEXT_PUBLIC_WEB_URL}`,
                  "logo": `${process.env.NEXT_PUBLIC_WEB_URL}/images/icons/learntech-logo.png`,
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "1800 120 8696",
                    "contactType": "customer service",
                    "contactOption": "TollFree",
                    "areaServed": "IN",
                    "availableLanguage": "en"
                  }
                }
              ),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                {
                  "@context": "https://schema.org/",
                  "@type": "WebSite",
                  "name": "Learntech Edu Solutions",
                  "url": `${process.env.NEXT_PUBLIC_WEB_URL}`,
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "{search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ),
            }}
          />





        </Head>

        <SessionProvider session={pageProps.session}> {/* Wrap with SessionProvider */}
          <AuthProvider>
            <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
              <SettingsConsumer>
                {({ settings }) => {
                  return (

                    <ThemeComponent settings={settings}>
                      <Guard authGuard={authGuard} guestGuard={guestGuard}>
                        {getLayout(<Component {...pageProps} />)}
                      </Guard>
                      {/* <ReactHotToast>
                        <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                      </ReactHotToast> */}
                    </ThemeComponent>

                  );
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </SessionProvider>
      </CacheProvider>
   
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MHML8KVC');
              `
        }}
      />


      <Script
        id="googletagmanager"
        src="https://www.googletagmanager.com/gtag/js?id=AW-990332405"
        strategy="afterInteractive"
      />

      <Script id="gtag-init" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-990332405');
  `}
      </Script>

      {/* <Script
        src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        strategy="afterInteractive"
      /> */}
    </>
  );
};

export default App;