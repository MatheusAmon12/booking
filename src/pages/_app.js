import App from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'

import createEmotionCache from '../../createEmotionCache'
import theme from '../theme'
import { ToastyProvider } from '../context/Toasty'
import CheckAuth from '@/components/CheckAuth'
 
export default function MyApp({ Component, pageProps }) {
  const cache = createEmotionCache()

  return (
    <>
      <CssBaseline />
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <ToastyProvider>
            <SessionProvider session={pageProps.session}>
              {
                Component.requireAuth
                  ? <CheckAuth Component={Component} pageProps={pageProps} />
                  : <Component {...pageProps} />
              }
            </SessionProvider>
          </ToastyProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}
 
MyApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context)
 
  return { ...ctx}
}