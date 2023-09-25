import { useState, useContext } from 'react'
import { StoreContext } from '../providers/storeProvider'
import Image from 'next/image'
import { useWindowSize } from '../helpers/useWindowSize'
import Video from '../svg/Video'
import Close from '../svg/Close'

const WallView = ({
    wallWidth={wallWidth},
    wallHeight={wallHeight},
    isOver={isOver},
    drop={drop},
    directFromStudio={directFromStudio},
    studioTour={studioTour}
}) => {
    const [store, setStore] = useContext(StoreContext)
    const [showVideo, setShowVideo] = useState(false)

    return (
        <div 
            className="wall-view-container"
            style={{ width: wallWidth, height: wallHeight }}    
        >
            <Image
                className="wall-view-image"
                src={"/images/walljpg.jpg"} 
                alt="Studio Wall" 
                width={1600}
                height={800}    
            />
            <div className="wall-view-text-container">
                <h1>{directFromStudio}</h1>
                <div 
                    className="wall-view-studio-tour-container"
                    onClick={() => setShowVideo(true)}    
                >
                    <h2>{studioTour}</h2>
                    <Video />
                </div>
            </div>
            {isOver && (
                <div 
                    className="wall-view-drop-container"
                    style={{ width: wallWidth, height: wallHeight }}
                >
                    <p>{drop}</p>
                </div>
            )}
            {showVideo && <StudioTourModal show={setShowVideo} />}
        </div>
    )
}

export const StudioTourModal = ({
    show={show}
}) => {
    const size = useWindowSize()
    return (
        <div className="studio-tour-modal-container">
            <div 
                className="studio-tour-modal-close"
                onClick={() => show(false)}    
            >
                <Close />
            </div>
            <video 
                width={size.width * .9} 
                autoPlay 
                loop
            >
              <source src="http://www.thefilterman.de/videos/megacities/deutscheStadt/deutscheStadt_overview_web.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default WallView