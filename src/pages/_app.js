import App from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { CacheProvider } from '@emotion/react'

import createEmotionCache from '../../createEmotionCache'
import theme from '../theme'
import { ToastyProvider } from '@/context/Toasty'
 
export default function MyApp({ Component, pageProps }) {
  const cache = createEmotionCache()

  return (
    <>
      <CssBaseline />
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <ToastyProvider>
            <Component {...pageProps} />
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