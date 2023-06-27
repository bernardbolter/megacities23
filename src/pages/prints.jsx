import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDrop } from 'react-dnd'
import DraggablePrint from '../components/DraggablePrint'
import { useWindowSize } from '../helpers/useWindowSize'

import SwitchLang from '../components/SwitchLang'
import Logo from "../components/Logo"
import Nav from "../components/Nav"
import NavMobile from '../components/NavMobile'

const printsData = [
    {id: 1, name: 'Deutsche Stadt'},
    {id: 2, name: 'America City'},
    {id: 3, name: 'Skate City'}
]

const Prints = () => {
    const { t } = useTranslation()
    const size = useWindowSize()

    const [wall, setWall] = useState([])
    console.log(wall)
    const [{ isOver }, dropRef] = useDrop({
        accept: 'print',
        drop: item => setWall(state => [...state, item]),
        // drop: (item) => setWall((state) => {
        //     !state.includes(item) ? [...state, item] : wall
        // }),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })
    
    return (
        <div className="prints-container">
            <SwitchLang />
            <Logo 
                title={t('megacities')}
                tagline={t('compositeCountryPortaits')}
            />
            {size.width > 600 ? (
                <Nav 
                    about={t('about')}
                    series={t('series')}
                    prints={t('prints')}
                    contact={t('contact')}
                /> 
            ): (
                <NavMobile
                    about={t('about')}
                    series={t('series')}
                    prints={t('prints')}
                    contact={t('contact')}
                /> 
            )}
            <div className="prints-info">
                <h1>A1 Prints</h1>
            </div>

            <div className="prints-selection">
                {printsData.map(print => (
                    <DraggablePrint key={print.id} draggable id={print.id} name={print.name} />
                ))}
            </div>

            <div 
                className="prints-wall"
                ref={dropRef}
                style={{ backgroundColor: isOver ? 'red' : 'white' }}
            >
                {wall.map(print => <DraggablePrint id={print.id} name={print.name} />)}
                {isOver && <div>Drop Here!</div>}
            </div>
        </div>
    )
}

export default Prints

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'prints'
      ])),
    },
  }
}
