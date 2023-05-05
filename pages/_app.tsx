import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import appContext from '@/context/context'

import { useState } from 'react'
import { CookiesProvider } from 'react-cookie';
import { cookies } from 'next/headers';
import { useCookies } from 'react-cookie';

export default function App({ Component, pageProps }: AppProps) {
  const [nameContext, setNameContext] = useState('default');
  // const [cookie, setCookie] = useCookies(['user'])
  // if (cookie.user != null) {
  //   setNameContext(cookie.user);
  // }
  let x = "default";

  return (
    <CookiesProvider>
      <appContext.Provider value={{ nameContext, setNameContext }}>
        <Component {...pageProps} />
      </appContext.Provider>
    </CookiesProvider>
  );
}
