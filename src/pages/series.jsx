import React, { useState, useEffect, useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import { useWindowSize } from "../helpers/useWindowSize"

import Logo from '../components/Logo'
import Nav from '../components/Nav'
import CountryNav from '../components/CountryNav'
import Loader from '../components/Loader'
import Arrow from '../svg/Arrow'

import City from '../components/City'
import SkateCity from '../components/SkateCity'

const Series = () => {
    const [mega] = useContext(MegaContext)
    const size = useWindowSize()
    const [cityWidth, setCityWidth] = useState(0)
    const [megaWidth, setMegaWidth] = useState(0)
    let [megaIndex, setMegaIndex] = useState(0)
    const [ alignCenter, setAlignCenter] = useState(false)
    const [ cityHeight, setCityHeight] = useState(0)

    useEffect(() => {
        if (size.height !== 0) {
            var getCityWidth = Math.round((size.height - 100) * 0.714285143)
            if (getCityWidth > (size.width * .9)) {
                setCityWidth(size.width * .9)
                setCityHeight((size.width * .9) * 1.39875)
                setAlignCenter(true)
            } else {
                setCityWidth(getCityWidth)
                setCityHeight(getCityWidth * 1.39875)
                setAlignCenter(false)
            }
            var getMegaWidth
            if (alignCenter) {
                getMegaWidth = Math.round((mega.megacities.length * getCityWidth) + ((mega.megacities.length * 170) + 60))
            } else {
                getMegaWidth = Math.round((mega.megacities.length * getCityWidth) + ((mega.megacities.length * 285) + 300))
            }
            setMegaWidth(getMegaWidth)
        }

        return () => {
            getCityWidth = 0
            getMegaWidth = 0
        }
    }, [mega.megacities, size, alignCenter])

    useEffect(() => {
        var megaMeasurement = megaWidth / mega.megacities.length
        window.scrollTo({
            left: megaIndex * megaMeasurement,
            behavior: 'smooth'
        })

        return () => null
    }, [megaIndex, mega.megacities, megaWidth])

    return (
        <main 
            className="series-container"
            style={{ overflow: size.width < 769 ? "hidden" : "initial" }}    
        >
            <Logo />
            <CountryNav setMegaIndex={setMegaIndex} />
            <Nav />
            {cityWidth !== 0 && megaWidth !== 0 ? (
                <div 
                    className="series-megacities"
                    style={{ 
                        width: size.width > 789 ? megaWidth : "100%",
                        height: alignCenter && size.width > 769 ? size.height - 100  : 'auto',
                    }}
                >
                    {mega.megacities.map(megacity => {
                        if (megacity.type === 'skateboarding') {
                            return <SkateCity 
                                        skateCity={megacity} 
                                        key={megacity.slug} 
                                        cityWidth={cityWidth} 
                                        cityHeight={cityHeight}
                                        alignCenter={alignCenter}
                                    />
                        } else {
                            return <City 
                                        megacity={megacity} 
                                        key={megacity.slug} 
                                        cityWidth={cityWidth}
                                        cityHeight={cityHeight}
                                        alignCenter={alignCenter} 
                                    />
                        }
                    })}
                </div>
            ) : (
                <Loader />
            )}
            {size.width > 769 && (
                <div className="series-bottom">
                    <div className={megaIndex > 0 ? "series-bottomLeft" : "series-bottomLeftDisabled"}
                        onClick={() => megaIndex > 0 ? setMegaIndex(megaIndex - 1) : null}
                        onKeyDown={(ev) => {
                            if (ev.keyCode === 13 && megaIndex > 0) {
                                setMegaIndex(megaIndex - 1)
                            }
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        {megaIndex > 0 && (
                            <div className="series-arrowsLeft">
                                <Arrow />
                                <Arrow />
                                <Arrow />
                            </div>
                        )}
                        <div className="series-lineLeft" />
                    </div>
                    <div 
                        className={megaIndex !== mega.megacities.length - 1 ? "series-bottomRight" : "series-bottomRightDisabled"}
                        onClick={() => megaIndex !== mega.megacities.length -1 ? setMegaIndex(megaIndex + 1) : null }
                        onKeyDown={(ev) => {
                            if (ev.keyCode === 14 && megaIndex !== mega.megacities.length -1) {
                                setMegaIndex(megaIndex + 1)  
                            }
                        }}
                        role="button"
                        tabIndex={-1}
                    >
                    <div className="series-lineRight" />
                        {megaIndex !== mega.megacities.length - 1 && (
                            <div className="series-arrowsRight">
                                <Arrow />
                                <Arrow />
                                <Arrow />
                            </div>
                        )}
                    </div>
                    <p 
                        className="series-scrollRight"
                        style={{
                            left: (size.width / 2) + 30
                        }}
                    >scroll right</p>
                </div>
            )}
        </main>
    )
}

export default Series