import { useContext } from 'react'
import { MegaContext } from '../providers/megaProvider'
import { StoreContext } from '../providers/storeProvider'
import { useWindowSize } from '../helpers/useWindowSize'
import { useDrag } from 'react-dnd'
import Image from 'next/image'

const DraggablePrint = ({ selection, print }) => {
    const [mega, setMega] = useContext(MegaContext)
    const [store, setStore] = useContext(StoreContext)
    const size = useWindowSize()

    const [{ isDragging }, dragRef] = useDrag({
        type: 'print',
        item: print,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <div className="draggable-print" ref={dragRef}>
            <div className="draggable-print-header">
                <Image 
                    src={`${mega.url}/flags/${print.flag}`} 
                    alt={`${print.country} Flag`} 
                    width={22}
                    height={14}    
                />
                <h1>{print.name}</h1>
                {/* <h3>53/<span>500</span></h3> */}
            </div>
            <Image
                src={`/images/a1s/${print.a1}.jpg`}
                alt={`print of ${print.name}`}
                width={size.width < 600 ? 200 : 250}
                height={size.width < 600 ? 283 : 354}
            />
            {/* {isDragging && '😱'} */}
            {!selection && (
                 <div 
                 className="draggable-cancel"
                 onClick={() => {
                    const newPrintSelection = []
                    var positionIndex = 1
                    store.printSelection.map(item => {
                        if (print.printPosition !== item.printPosition) {
                            newPrintSelection.push({
                                id: item.id,
                                name: item.name,
                                printPosition: positionIndex
                            })
                            positionIndex = positionIndex + 1
                        }  
                    })
                    storeMega(state => ({ ...state, printSelection: newPrintSelection, tooManyPrints: false }))
                 }}    
             >
                 <h1>X</h1>
             </div>
            )}
        </div>
    )
}

export default DraggablePrint