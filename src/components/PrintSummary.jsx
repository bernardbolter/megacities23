import { useState, useEffect, useContext } from 'react'
import { StoreContext } from '../providers/storeProvider'
import { MegaContext } from '../providers/megaProvider'
import Link from 'next/link'
import Image from 'next/image'
import Remove from '../svg/Remove'

const PrintSummary = ({
    yourSelection = {yourSelection},
    withinEU = {withinEU},
    worldwide = {worldwide},
    checkout = {checkout},
    remove={remove}
}) => {
    const [store, setStore] = useContext(StoreContext)
    const [price, setPrice] = useState(0)
    const [shipping, setShipping] = useState('')
    console.log(store.printSelection)

    useEffect(() => {
        if (store.printSelection.length === 1) {
            setPrice(30)
            setShipping(withinEU)
        } else if (store.printSelection.length === 2) {
            setPrice(55)
            setShipping(withinEU)
        } else if (store.printSelection.length === 3) {
            setPrice(75)
            setShipping(worldwide)
        } else if (store.printSelection.length === 4 ) {
            setPrice(75)
            setShipping(worldwide)
        } else {
            setPrice(30)
            setShipping(worldwide)
        }
    }, [store.printSelection])
    
    return (
        <div className="print-summary-container">
            <div className="print-summary-prints">
                <p className="print-summary-selection">{yourSelection}:</p>
                <div className="print-summary-selection-container">
                    {store.printSelection.map(print => (
                        <ThePrint print={print} remove={remove} key={print.printPosition} />
                    ))}
                </div>
            </div>

            <div className="print-summary-cost">
                <p className="print-summary-price">€ {price}</p>
                <p className="print-summary-shipping">{shipping}</p>

                <Link 
                    href="/checkout"
                    className="print-summary-checkout"
                >
                    {checkout}
                </Link>
            </div>
            
        </div>
    )
}

export const ThePrint = ({ print={print}, remove={remove} }) => {
    console.log(print)
    console.log(print.name)
    const [store, setStore] = useContext(StoreContext)
    const [mega, setMega] = useContext(MegaContext)
    return (
        <div className="print-selection">
             <Image 
                src={`${mega.url}/flags/${print.flag}`} 
                alt={`${print.country} Flag`} 
                width={22}
                height={14}    
            />
            {print.name}
            <div 
                className="print-selection-cancel"
                onClick={() => {
                    console.log(store.printSelection)
                    var removedPrintSelection = store.printSelection.filter(p => p.printPosition !== print.printPosition)
                    console.log(removedPrintSelection)
                    var newPrintSelection = []
                    removedPrintSelection.map((print,i) => {
                        print.printPosition = i + 1
                        newPrintSelection.push(print)
                    })
                    console.log(newPrintSelection)
                    setStore(state => ({...state, printSelection: newPrintSelection}))  
                }}
            >
                <h1>{remove}</h1>
                <Remove />
            </div>
        </div>
    )
}

export default PrintSummary