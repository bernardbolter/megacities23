import { useState, useEffect, useContext, useMemo } from 'react'
import { StoreContext } from '../providers/storeProvider'
import { useWindowSize } from '../helpers/useWindowSize'
import { useDrop } from 'react-dnd'
import DraggablePrint from '../components/DraggablePrint'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import WallView from '../components/WallView'
import PrintSummary from '../components/PrintSummary'
import { decideWallSize } from '../helpers/'

import ScrollArrow from '../svg/ScrollArrow'

const printVariants = {
    visible: { transition: { duration: 1, ease: "linear" } },
  };

const GalleryView = ({
    dragAndDrop = {dragAndDrop},
    scroll = {scroll},
    drop = {drop},
    directFromStudio = {directFromStudio},
    studioTour = {studioTour},
    yourSelection = {yourSelection},
    withinEU = {withinEU},
    worldwide = {worldwide},
    checkout = {checkout},
    shuffledPrints = {shuffledPrints},
    remove = {remove}    
}) => {
    const [store, setStore] = useContext(StoreContext)
    const [printNavCount, setPrintNavCount] = useState(0)
    const size = useWindowSize()
    const controls = useAnimation();
    const [wallWidth, setWallWidth] = useState(0)
    const [wallHeight, setWallHeight] = useState(0)

    useEffect(() => {
        const [width, height] = decideWallSize(size.width, store.printSelection.length)
        setWallWidth(width)
        setWallHeight(height)
    }, [size.width, store.printSelection])

    const printWidth = useMemo(() => {
        if (size.width < 600) {
            return 200
        } else {
            return 260
        }
    }, [size.width])

    const printSelectionWidth = useMemo(() => {
        return size.width < 600 ? (shuffledPrints.length * printWidth) + 10 : (shuffledPrints.length * printWidth) + 10
    }, [size.width, shuffledPrints])

    const printSelectionNumber = useMemo(() => {
        for (let i = 1; i <= shuffledPrints.length; i++) {
            if ((printWidth * i) + 10 > size.width) {
                return i - 1
            }
        }
    }, [size.width, printSelectionWidth])

    const [{ isOver }, dropRef] = useDrop({
        accept: 'print',
        drop: item => {
            console.log(item)
            if (store.printSelection.length ===4) {
                setStore(state => ({ ...state, tooManyPrints: true}))
            } else {
                const printPosition = store.printSelection.length + 1
                const newItem = { ...item, printPosition}
                setStore(state => ({...state, printSelection: [...state.printSelection, newItem]}))
            }
            
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    useEffect(() => {
        controls.start({ x: printNavCount * -210 })
    }, [printNavCount, controls])

    const printNavDown = () => {
        setPrintNavCount(printNavCount - 1)
    }

    const printNavUp = () => {
        setPrintNavCount(printNavCount + 1)
    }
    
    return (
        <div className="gallery-view-container">
            <div className="prints-selection-container">
                <motion.div
                    animate={controls}
                    initial="hidden"
                    varients={printVariants}
                    className="prints-selection"
                    style={{
                        width: printSelectionWidth
                    }}
                >
                    {shuffledPrints.map((print,i) => (
                        <DraggablePrint
                            selection={true} 
                            key={i} 
                            draggable print={print} 
                        />
                    ))}
                </motion.div>
            </div>

            <div className="prints-navigation">
                {printSelectionWidth > size.width && (
                    <div className="prints-nav-arrows">
                        <p className="prints-nav-scroll">{scroll}</p>
                        <div 
                            className={printNavCount > 0 ? "prints-navigate-arrow prints-navigate-arrow-left" : "prints-navigate-arrow prints-navigate-arrow-left prints-navigate-arrow-noclick"}
                            onClick={() => printNavCount > 0 ? printNavDown() : null}
                        >
                            <ScrollArrow />
                        </div>
                        <div 
                            className={printNavCount < shuffledPrints.length - printSelectionNumber ? "prints-navigate-arrow prints-navigate-arrow-right" : "prints-navigate-arrow prints-navigate-arrow-right prints-navigate-arrow-noclick"}
                            onClick={() => printNavCount < shuffledPrints.length - printSelectionNumber ? printNavUp() : null}
                        >
                            <ScrollArrow />
                        </div>
                    </div>
                )}
                <h1>{dragAndDrop} &darr;</h1>
            </div>
            
            {store.tooManyPrints && (
                <div className="prints-too-many">
                    <h1>If you would like to order more than 4 prints, send an email</h1>
                </div>
            )}

            <div 
                className="prints-wall"
                ref={dropRef}
                style={{ 
                    width: wallWidth,
                    height: wallHeight
                 }}
            >
                <WallView 
                    wallWidth={wallWidth}
                    wallHeight={wallHeight}
                    isOver={isOver}
                    drop={drop}
                    directFromStudio={directFromStudio}
                    studioTour={studioTour}
                />
            </div>

            {store.printSelection.length > 0 && (
                <PrintSummary
                    yourSelection = {yourSelection}
                    withinEU = {withinEU}
                    worldwide = {worldwide}
                    checkout = {checkout}
                    remove = {remove}
                />
            )}


        </div>
    )
}

export default GalleryView