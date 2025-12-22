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
          <title>Study in India | Study Abroad | admin</title>
          <meta name='keywords' content='Learntechweb' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />



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
                    </ThemeComponent>
                  );
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </SessionProvider>
      </CacheProvider>


    </>
  );
};

export default App;