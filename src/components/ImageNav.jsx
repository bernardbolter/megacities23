import { useContext } from 'react'
import { MegaContext } from '../providers/megaProvider'

import EyeOpen from '@/svg/EyeOpen'
import EyeClosed from '@/svg/EyeClosed'
import Plus from '@/svg/Plus'
import Minus from '@/svg/Minus'

const ImageNav = () => {
    const [mega, setMega] = useContext(MegaContext)

    return (
        <>
            <section className={mega.hideAllNavs ? 'image-nav image-nav-hide' : 'image-nav'}>
                {mega.hideAllNavs ? (
                    <div 
                        className="image-nav-eye"
                        onClick={() => setMega(state => ({ ...state, hideAllNavs: false}))}
                    >
                        <EyeOpen />
                    </div>
                ) : (
                    <div 
                        className="image-nav-eye"
                        onClick={() => setMega(state => ({ ...state, hideAllNavs: true}))}
                    >
                        <EyeClosed />
                    </div>
                )}
                {mega.isInitial ? (
                    <div 
                        className="image-nav-plus"

                        onClick={() => setMega(state => ({ ...state, zoomLevel: 'lg', isInital: false }))}
                    >
                        <Plus />
                    </div>
                ) : (
                    <div 
                        className={mega.zoomLevel === 'lg' ? "image-nav-plus" : "image-nav-plus image-nav-plus-disabled"}
                        onClick={() => zoomLevel === 'lg' ? setMega(state => ({ ...state, zoomLevel: 'xl' })) : null}
                    >
                        <Plus />
                    </div>
                )}
                
                {mega.isInitial ? (
                    <div 
                        className="image-nav-minus image-nav-minus-disabled" 
                    >
                        <Minus />
                    </div>
                ) : (
                    <div 
                        className="image-nav-minus"
                        onClick={() => (zoomLevel === 'lg') 
                            ? setMega(state => ({ ...state, zoomLevel: 'normal', isIntial: true })) 
                            : setMega(state => ({ ...state, zoomLevel: 'lg' }))
                        }       
                    >
                        <Minus />
                    </div>
                )}
                
            </section>
            <div className={mega.hideAllNavs ? 'image-nav-background image-nav-background-hide' : 'image-nav-background'} />
        </> 
    )
}

export default ImageNav