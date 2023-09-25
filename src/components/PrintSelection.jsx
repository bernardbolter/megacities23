import { useContext } from 'react'
import { MegaContext } from '../providers/megaProvider'

const PrintSelection = () => {
    const [mega, setMega] = useCOntext(MegaContext)
    
    return (
        <div className="print-selection-container">
            <h1>Print Selection</h1>
        </div>
    )
}

export default PrintSelection