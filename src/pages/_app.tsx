import '@/styles/globals.css'
import '@/styles/about.scss'
import '@/styles/world-label.scss'
import '@/styles/index.scss'
import '@/styles/navigation.scss'
import '@/styles/nav-mobile.scss'
import '@/styles/series.scss'
import '@/styles/city.scss'
import '@/styles/country-nav.scss'
import '@/styles/loader.scss'
import '@/styles/logo.scss'
import '@/styles/mega-nav.scss'
import '@/styles/skate-city.scss'
import '@/styles/typewriter.scss'
import '@/styles/switch-lang.scss'
import '@/styles/contact.scss'
import '@/styles/zoom-map.scss'
import '@/styles/mega-image.scss'
import '@/styles/mega-nav-info.scss'
import '@/styles/mega-nav-link.scss'
import '@/styles/mega-nav-pagination.scss'
import '@/styles/mega-nav-video.scss'
import '@/styles/image-nav.scss'
import '@/styles/prints.scss'
import '@/styles/gallery-view.scss'
import '@/styles/draggable-print.scss'
import '@/styles/wall-view.scss'
import '@/styles/print-summary.scss'
import '@/styles/print-list.scss'

import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import MegaProvider from '../providers/megaProvider'
import StoreProvider from '../providers/storeProvider'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Noto_Sans } from '@next/font/google'
const noto = Noto_Sans({ weight: ['200', '400','900'], subsets: ['latin', 'cyrillic']})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MegaProvider>
      <StoreProvider>
        <DndProvider backend={HTML5Backend}>
          <main>
            <Component {...pageProps} />
          </main>
        </DndProvider>
      </StoreProvider>
    </MegaProvider>
  )
}

export default appWithTranslation(App)
