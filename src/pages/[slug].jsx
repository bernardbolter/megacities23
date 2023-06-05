import { useEffect, useMemo, useContext } from 'react'
import { MegaContext } from '../providers/megaProvider'
import { useWindowSize } from '../helpers/useWindowSize'
import { getCityMeasurements } from '../helpers'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Nav from '../components/Nav'
import MegaNav from '../components/MegaNav'
import MegaImage from '../components/MegaImage'
import ImageNav from '../components/ImageNav'
import ZoomMap from '../components/ZoomMap'

import megacities from '../data/megacities/megacities.json'

const Megacity = props => {
    const { slug, name } = props.megacity
    const { t } = useTranslation()
    const [mega, setMega] = useContext(MegaContext)
    const size = useWindowSize()

    useEffect(() => {
        const cityMeasurments = getCityMeasurements(size.width, size.height)
        setMega(state => ({ ...state, cityWidth: cityMeasurments[0], cityHeight:  cityMeasurments[1]}))
    }, [size.width, size.height])

    useEffect(() => {
        let newMegaNavCities = []
        if (props.megacity.type === 'skateboarding') {
            props.megacity.spots.map(spot => {
                newMegaNavCities.push({...spot, visible: false})
            })
        } else {
            props.megacity.cities.map(city => {
                newMegaNavCities.push({...city, visible: false})
            })
        }
        
        console.log(newMegaNavCities)
        setMega(state => ({ ...state, megaNavCities: newMegaNavCities }))
    }, [])

    return (
        <div 
            className="megacity-container"
            style={{
                width: size.width,
                height: size.height
            }}    
        >
            <Nav 
                about={t('about')}
                series={t('series')}
                prints={t('prints')}
                contact={t('contact')}
            />
            <MegaNav megacity={props.megacity} />
            <MegaImage slug={slug} name={name} />
            <ImageNav />
            <ZoomMap 
                winWidth={size.width} 
                winHeight={size.height}
                slug={slug}
            />
        </div>
    )
}

export default Megacity

export const getStaticPaths = async () => {
    const paths = megacities.map(megacity => ({
        params: { slug: megacity.slug }
    }))

    return { paths, fallback: false}
}

export const getStaticProps = async ({ params, locale = 'en' }) => {
    const megacity = megacities.filter(m => m.slug === params.slug)

    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common'
              ])),
            megacity: megacity[0]
        }
    }
}