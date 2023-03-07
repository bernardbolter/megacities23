import { useState, useEffect, useContext, useRef } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Loadable from '@loadable/component'
import { useWindowSize } from '../helpers/useWindowSize'

import Logo from '../components/Logo'
import Nav from '../components/Nav'
import WorldGeo from '../data/world/world.json'

const Globe = Loadable(() => import('react-globe.gl'))

const IndexPage = () => {
  const [mega, setMega] = useContext(MegaContext)
  const [hoverD, setHoverD] = useState('')
  const [allMegas, setAllMegas] = useState([])
  const size = useWindowSize()
  const router = useRouter()

  useEffect(() => {
    var onlyCities = mega.megacities.filter(mega => mega.slug !== 'skate-city')
    onlyCities.map(city => {
      var megaObject = mega.megacities.filter(mega => mega.slug === city.slug)
      var countryObject = WorldGeo.filter(geo => geo.slug === city.slug)
      var combined = {...megaObject[0], ...countryObject[0]}
      return setAllMegas(prevArray => [...prevArray, combined])
    })
  }, [mega.megacities])

//   const makeHeader = (name, englishName, flag) => {
//       var englishBlock
//       if (englishName === undefined) {
//         englishBlock = `<p class="world-english-block-empty"></p>`
//       } else {
//           englishBlock = `<p class="world-english-block">${englishName}</p>`
//       }
//       const headerBlock = `
//             <div
//                 class="world-header-block"
//                 style="height: ${englishName === null ? "20px" : "35px"};"
//             >
//                 <div class="world-header-text-wrap">
//                     <p 
//                         class="world-header-block-text"
//                         style="font-size: ${englishName === null ? "16px" : "24px"};"
//                     >${name}</p>
//                     ${englishBlock}
//                 </div>
//                 <img src="${mega.url}flags/${flag}" alt="${name} flag" />
//           </div>
//       `
//       return headerBlock
//   }

//   const makeCities = (cities) => {
//       var cityText = ``
//       cities.map(city => {
//           var oneCity = `
//               <div class="world-cities-wrap" >
//                   <p class="world-cities-name">${city.name}</p>
//                   <p class="world-cities-english-name"
//                       style="display: ${city.englishName === null ? "none" : "block"}"
//                   >${city.englishName === null ? "" : city.englishName}</p>
//                   <p class="world-cities-pop-total">${city.population}</p>
//               </div>
//           `
//           return cityText += oneCity
//       })
//       return cityText
//   }

//   const makePop = (cities) => {
//       var totalPopulation = 0
//       cities.map(city => {
//           return totalPopulation = totalPopulation + parseInt(city.population.replace(/,/g, ''), 10)
//       })
//       return totalPopulation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//   }

//   useEffect(() => {
//     // Auto-rotate
//     console.log("out: ", globeEl.current)
    
//     if (globeEl.current !== undefined ) {
//         console.log("in: ", globeEl.current)
//         globeEl.current.controls().autoRotate = true;
//         globeEl.current.controls().autoRotateSpeed = 0.1;
//     }
//   }, [globeEl.current]);

  return (
    <main className="index-container">
        <Link
            href="/cities"
            className="index-logo"
        >
            <Logo />
        </Link>
        <Nav />
        <Globe
            globeImageUrl={'/images/flag-world.jpg'}
            backgroundImageUrl={'/images/night-sky.png'}
            lineHoverPrecision={0}
            polygonsData={allMegas}
            polygonAltitude={0.01}
            polygonCapColor={() => 'transparent'}
            polygonSideColor={() => 'rgba(255, 255, 255, 0.1)'}
            polygonStrokeColor={() => 'transparent'}
            polygonLabel={({ cities, flag, name, englishName }) => {
                if (size.width > 768) {
                    return (`
                        <div class="world-label-small">
                            <div class="world-small-title-container">
                                <h2 class="world-small-title">${name}</h2>
                                <p class="world-small-english">${englishName !== undefined ? englishName : ''}</p>
                            </div>
                            <img src="${mega.url}flags/${flag}" alt="${name} flag" />
                        </div>
                    `)
                    // return (`
                    //     <div class="world-label">
                    //         ${makeHeader(n,e,f)}
                    //         <div class="world-label-horo-top"></div>
                    //         <div class="world-label-list">${makeCities(c)}</div>
                    //         <div class="world-label-horo-bottom"></div>
                    //         <div class="world-pop-wrap">
                    //             <p class="world-pop-text">total population:</p>
                    //             <p class="world-pop-total">${makePop(c)}</p>
                    //         </div>
                    //     </div>
                    // `)
                }
            }}
            onPolygonHover={p => p !== undefined ? setHoverD(p) : null}
            polygonsTransitionDuration={300}
            onPolygonClick={({ slug }) => {
                console.log(slug)
                setMega(state => ({ ...state, megaIndexSlug: slug }))
                router.push('/series')
            }}
        />
        {(hoverD !== null) && (hoverD) && (size.width > 768) && (
            <div className="index-thumbnail">
                <Image 
                    src={`${mega.url}/${hoverD.slug}/${hoverD.slug}_sm.jpg`} 
                    alt={hoverD.slug} 
                    width={200}
                    height={280}    
                />
            </div>
        )}
    </main>
  )
}

export default IndexPage