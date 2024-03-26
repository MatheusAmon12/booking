import App from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { CacheProvider } from '@emotion/react'

import createEmotionCache from '../../createEmotionCache'
import theme from '../theme'
 
export default function MyApp({ Component, pageProps }) {
  const cache = createEmotionCache()

  return (
    <>
      <CssBaseline />
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}
 
MyApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context)
 
  return { ...ctx}
}