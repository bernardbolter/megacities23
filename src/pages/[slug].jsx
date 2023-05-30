import { useEffect, useMemo, useContext } from 'react'
import { MegaContext } from '../providers/megaProvider'
import { useWindowSize } from '../helpers/useWindowSize'

import Nav from '../components/Nav'
import MegaNav from '../components/MegaNav'
import MegaImage from '../components/MegaImage'
import ImageNav from '../components/ImageNav'
import ZoomMap from '../components/ZoomMap'

import megacities from '../data/megacities/megacities.json'

const Megacity = props => {
    const { slug, name } = props.megacity
    console.log(props)
    const [mega, setMega] = useContext(MegaContext)
    const size = useWindowSize()

    useEffect(() => {
        let newCurrentImagesState = []
        props.megacity.cities.map(city => {
            newCurrentImagesState.push({...city, visible: false})
        })
        console.log(newCurrentImagesState)
        setMega(state => ({ ...state, currentImagesState: newCurrentImagesState }))
    }, [])

    return (
        <div 
            className="megacity-container"
            style={{
                width: size.width,
                height: size.height
            }}    
        >
            <Nav />
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

export const getStaticProps = async ({ params }) => {
    const megacity = megacities.filter(m => m.slug === params.slug)

    return {
        props: {
            megacity: megacity[0]
        }
    }
}