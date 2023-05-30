import { useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import { NextSeo } from 'next-seo'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Logo from '../components/Logo'
import Nav from '../components/Nav'
import SwitchLang from '../components/SwitchLang'
import Switch from '../svg/Switch'

import WrappedGlobe from '../components/GlobeWrapper'
import { curvedText } from '../helpers/index'

const IndexPage = () => {
    const { t } = useTranslation('common')
    const [mega, setMega] = useContext(MegaContext)

  return (
    <>
      <NextSeo
        title={t('seoTitle')}
        description={t("seoDescription")}
        keywords={t('seoKeywords')}
      />
      <main className="index-container">
          <Logo
            title={t('megacities')}
            tagline={t('compositeCountryPortaits')}
          />
          <Nav 
            about={t('about')}
            series={t('series')}
            prints={t('prints')}
            contact={t('contact')}
          />

          <div className="index-world-ready">
            <img src="/images/globe.gif" alt="spinning globe animation" />
            <h2>Loading World...</h2>
          </div>

          <SwitchLang />

          <WrappedGlobe />

          {mega.worldReady && (
            <div className="index-slogan">
              <p>{mega.megaGlobe ? curvedText(t('weAreTheWorld')) : curvedText(t('weSkateTheWorld'))}</p>
            </div>
          )}

          {mega.worldReady && (
            <div 
                className="index-chose-mega"
                onClick={() => setMega(state => ({ ...state, megaGlobe: !state.megaGlobe }))}
            >
                <Switch />
                <p>{mega.megaGlobe ? `${t('skateWorld')}` : `${t('megacities')}`}</p>
            </div>
          )}
      </main>
    </>
  )
}

export default IndexPage

export async function getStaticProps({ locale = 'en' }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common'
        ])),
      },
    }
  }