import '@/styles/globals.css'
import '@/styles/world-label.scss'
import '@/styles/index.scss'
import '@/styles/navigation.scss'


import type { AppProps } from 'next/app'
import MegaProvider from '../providers/megaProvider'

import { Noto_Sans } from '@next/font/google'
const noto = Noto_Sans({ weight: ['200', '400','900'], subsets: ['latin', 'cyrillic']})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MegaProvider>
      <main className={noto.className}>
      <Component {...pageProps} />
      </main>
    </MegaProvider>
  )
}
