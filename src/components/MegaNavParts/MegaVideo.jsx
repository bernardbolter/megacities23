import React from 'react'
import ReactPlayer from 'react-player'

import Close from '@/svg/Close'

const MegaVideo = ({ video, artist, title, start, setMegaNavVideoOpen }) => {

    return (
        <div className="mega-video-container">
            <ReactPlayer
                url={video}
                height={megaNavWidth * .6}
                width={megaNavWidth}
                config={{
                    youtube: {
                        playerVars: {
                            autoplay: true,
                            origin: 'http://localhost:3000',
                            start: start !== undefined ? start : 0
                        }
                    }
                }}
            />
            <div className="mega-video-bottom">
                <h1>{artist}</h1>
                <h2>{title}</h2>
                <div 
                    className="mega-video-close"
                    onClick={() => setMegaNavVideoOpen(false)}
                >
                    <Close />
                    <p>close</p>
                    
                </div>
            </div>
        </div>
    )
}

export default MegaVideo