import { useRef, useMemo, useContext } from 'react'
import { MegaContext } from '../providers/megaProvider'
import { useWindowSize } from '../helpers/useWindowSize'
import Draggable from 'react-draggable'
import Image from 'next/image'

/////////////////////////
//  Images Sizes
//  xl - 1600 x 2238
//  lg - 1200 x 1679
//  md - 800 x 1119
//  sm - 500 x 699
//  proportion - 0.714285143
//  Y proportion - 1.39875
//  original 14300 x 20000 300ppi
/////////////////////////

const MegaImage = ({ slug, name }) => {
    const [mega, setMega] = useContext(MegaContext)
    const nodeRef = useRef()
    const size = useWindowSize()

    const imageUrl = useMemo(() => {
        return `${mega.url}${slug}/${slug}_${mega.imageSize}.jpg`
    }, [mega.url, slug, mega.imageSize])

    const normalSize = useMemo(() => {
        return { width: 300, height: 400 }
    }, [size.width, size.height])

    const handleDrag = (position) => {
        const { x,y } = position
        setMega(state => ({ ...state, controlledPosition: { x: x, y: y } }))
    }
    return (
        <>
            {mega.zooming ? (
                <Draggable
                    onDrag={handleDrag}
                    position={mega.controlledPosition}
                    nodeRef={nodeRef}
                    bounds={mega.zoomLevel === 'lg' ? mega.lgBounds : mega.xlBounds }
                >
                    <div
                        style={{
                            position: 'fixed',
                            zIndex: 2,
                            width: mega.zoomLevel === 'lg' ? 1200 : 1600,
                            height: mega.zoomLevel === 'lg' ? 1679 : 2238
                        }}
                        ref={nodeRef}
                    >
                        <Image
                            style={{
                                position: 'absolute'
                            }}
                            draggable={false}
                            src={`${mega.url}${slug}/${slug}_lg.jpg`}
                            alt={`${name} Megacity`}
                            fill
                        />
                    </div>
                </Draggable>
            ) : (
                <div className="mega-image-normal">
                    <Image
                        draggable={false}
                        src={`${mega.url}${slug}/${slug}_md.jpg`}
                        alt={`${name} `}
                        width={normalSize.width}
                        height={normalSize.height}
                    />
                </div>
            )}
    
        </>
    )
}

export default MegaImage