import { useContext } from'react'
import { MegaContext } from '../../providers/megaProvider'

import MegaVideo from './MegaVideo'

import YouTube from '../../svg/YouTube'
import Close from '../../svg/Close'
import EyeOpen from '../../svg/EyeOpen'
import EyeClosed from '../../svg/EyeClosed'

const MegaNavInfo = ({
    setMegaNavInfoOpen,
    info,
    setMegaNavInfoData,
    megaNavVideoOpen,
    setMegaNavVideoOpen,
    megaNavWidth,
    megacity
}) => {
    console.log(info)
    console.log(setMegaNavInfoOpen)
    console.log(setMegaNavInfoData)
    console.log(megaNavVideoOpen)
    console.log(setMegaNavVideoOpen)
    const [mega, setMega] = useContext(MegaContext)
    
    return (
        <div 
            className="mega-mav-info"
            style={{ width: megaNavWidth }}
        >
            {megaNavVideoOpen ? (
                <MegaVideo 
                    artist={info.city.artist}
                    title={info.city.title}
                    video={info.city.video}
                    start={info.city.start}
                    setMegaNavVideoOpen={setMegaNavVideoOpen}
                />
                ) : (
                <>
                    <div className="mega-link-left">
                        {megacity.type === 'skateboarding' ? (
                            <h1 className="skate-name">{info.city.name}</h1>
                        ) : (
                            <h1><span className="no-break">{info.city.name}</span> {info.city.englishName ? <span className="english-name">{info.city.englishName}</span> : null}</h1>
                        )}
                        {info.city.video !== undefined && info.city.video.length !== 0 ? (
                            <div 
                                className="mega-nav-info-video"
                                onClick={() => setMegaNavVideoOpen(true)}
                            >
                                <YouTube />
                                <p>video</p>
                            </div>
                        ) : null}
                    </div>
                    <div className="mega-nav-info-right">
                        <div 
                            className="mega-nav-info-close"
                            onClick={() => {
                                console.log('mega nav info close')
                                setMegaNavInfoData({})
                                setMegaNavInfoOpen(false)
                            }}    
                        >
                            <p>close</p>
                            <Close />
                        </div>
                        {megacity.type === 'skateboarding' ? (
                            <div className="mega-nav-info-right-data">
                                <h3>{info.city.city}</h3>
                                <h4>{info.city.state}</h4>
                            </div>
                        ) : (
                            <div className="mega-nav-info-right-data">
                                <h5>population</h5>
                                <h2>{info.city.population}</h2>
                            </div>
                        )}
                        <div 
                            className="mega-nav-info-eye"
                            onClick={() => console.log('mega nav info eye')}
                        >
                            {info.visible ? <EyeOpen /> : <EyeClosed />}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MegaNavInfo