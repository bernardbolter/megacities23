import '@/styles/globals.css'
import '@/styles/about.scss'
import '@/styles/world-label.scss'
import '@/styles/index.scss'
import '@/styles/navigation.scss'
import '@/styles/series.scss'
import '@/styles/city.scss'
import '@/styles/country-nav.scss'
import '@/styles/loader.scss'
import '@/styles/logo.scss'
import '@/styles/mega-nav.scss'
import '@/styles/skate-city.scss'
import '@/styles/typewriter.scss'

import type { AppProps } from 'next/app'
import MegaProvider from '../providers/megaProvider'

import { Noto_Sans } from '@next/font/google'
const noto = Noto_Sans({ weight: ['200', '400','900'], subsets: ['latin', 'cyrillic']})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MegaProvider>
      <main>
      <Component {...pageProps} />
      </main>
    </MegaProvider>
  )
}
