import React, { useEffect, useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import { useWindowSize } from "../helpers/useWindowSize"
import { getCityMeasurements } from '../helpers'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Logo from '../components/Logo'
import Nav from '../components/Nav'
import NavMobile from '../components/NavMobile'
import SwitchLang from '../components/SwitchLang'
import CountryNav from '../components/CountryNav'
import Loader from '../components/Loader'
import Arrow from '../svg/Arrow'

import City from '../components/City'
import SkateCity from '../components/SkateCity'

const Series = () => {
    const { t } = useTranslation()
    const [mega, setMega] = useContext(MegaContext)
    const size = useWindowSize()

    useEffect(() => {
        const cityMeasurments = getCityMeasurements(size.width, size.height)
        setMega(state => ({ ...state, cityWidth: cityMeasurments[0], cityHeight:  cityMeasurments[1]}))
    }, [size.width, size.height])


    return (
        <main 
            className="series-container"
            style={{ overflow: size.width < 769 ? "hidden" : "initial" }}    
        >
            <Logo 
                title={t('megacities')}
                tagline={t('compositeCountryPortaits')}
            />
            <CountryNav  />
            {size.width > 600 ? (
                <Nav 
                    about={t('about')}
                    series={t('series')}
                    prints={t('prints')}
                    contact={t('contact')}
                /> 
            ): (
                <NavMobile
                    about={t('about')}
                    series={t('series')}
                    prints={t('prints')}
                    contact={t('contact')}
                /> 
            )}
            
            <SwitchLang />

            {mega.cityWidth !== 0 ? (
                <div className="series-megacities" >
                    {mega.megacities.map((megacity, i) => {
                        if (megacity.type === 'skateboarding') {
                            return <SkateCity 
                                        skateCity={megacity} 
                                        key={megacity.slug} 
                                        cityWidth={mega.cityWidth} 
                                        cityHeight={mega.cityHeight}
                                        even={i % 2 == 0}
                                    />
                        } else {
                            return <City 
                                        megacity={megacity} 
                                        key={megacity.slug} 
                                        cityWidth={mega.cityWidth}
                                        cityHeight={mega.cityHeight}
                                        even={i % 2 == 0}
                                    />
                        }
                    })}
                </div>
            ) : (
                <Loader />
            )}
        </main>
    )
}

export default Series

export async function getStaticProps({ locale = 'en' }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
          'series'
        ])),
      },
    }
  }