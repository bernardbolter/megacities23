import React, { useState, useEffect, useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import { useWindowSize } from "../helpers/useWindowSize"

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Logo from '../components/Logo'
import Nav from '../components/Nav'
import SwitchLang from '../components/SwitchLang'
import CountryNav from '../components/CountryNav'
import Loader from '../components/Loader'
import Arrow from '../svg/Arrow'

import City from '../components/City'
import SkateCity from '../components/SkateCity'

const Series = () => {
    const { t } = useTranslation()
    const [mega] = useContext(MegaContext)
    const size = useWindowSize()
    const [cityWidth, setCityWidth] = useState(0)
    let [megaIndex, setMegaIndex] = useState(0)
    const [ alignCenter, setAlignCenter] = useState(false)
    const [ cityHeight, setCityHeight] = useState(0)

    useEffect(() => {
        if (size.height !== 0) {
            var getCityWidth = Math.round((size.height - 100) * 0.714285143)
            console.log(getCityWidth)
            if (getCityWidth > (size.width * .9)) {
                setCityWidth(size.width * .9)
                setCityHeight((size.width * .9) * 1.39875)
                setAlignCenter(true)
            } else {
                setCityWidth(getCityWidth)
                setCityHeight(getCityWidth * 1.39875)
                setAlignCenter(false)
            }
        }

        return () => {
            getCityWidth = 0
        }
    }, [mega.megacities, size, alignCenter])

    return (
        <main 
            className="series-container"
            style={{ overflow: size.width < 769 ? "hidden" : "initial" }}    
        >
            <Logo 
                title={t('megacities')}
                tagline={t('compositeCountryPortaits')}
            />
            <CountryNav setMegaIndex={setMegaIndex} />
            <Nav 
                about={t('about')}
                series={t('series')}
                prints={t('prints')}
                contact={t('contact')}
            /> 
            <SwitchLang />

            {cityWidth !== 0 ? (
                <div className="series-megacities" >
                    {mega.megacities.map((megacity, i) => {
                        if (megacity.type === 'skateboarding') {
                            return <SkateCity 
                                        skateCity={megacity} 
                                        key={megacity.slug} 
                                        cityWidth={cityWidth} 
                                        cityHeight={cityHeight}
                                        even={i % 2 == 0}
                                    />
                        } else {
                            return <City 
                                        megacity={megacity} 
                                        key={megacity.slug} 
                                        cityWidth={cityWidth}
                                        cityHeight={cityHeight}
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