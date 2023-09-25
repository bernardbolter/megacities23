import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MegaContext } from '../providers/megaProvider'
import { StoreContext } from '../providers/storeProvider'
import Link from 'next/link'
import { shuffle } from '../helpers'
import prints from '../data/prints/prints.json'

import { useWindowSize } from '../helpers/useWindowSize'

import Header from '../components/Header'

import GalleryView from '../components/GalleryView'

import Switch from '../svg/Switch'
import Cart from '../svg/Cart'

const Prints = props => {
    const { t } = useTranslation()
    const size = useWindowSize()
    const [mega, setMega] = useContext(MegaContext)
    const [store, setStore] = useContext(StoreContext)
    
    return (
        <div className="prints-container">
            <Header 
                title={t('megacities')}
                tagline={t('compositeCountryPortraits')}
                about={t('about')}
                series={t('series')}
                prints={t('prints')}
                contact={t('contact')}
            />
            
            <div className="prints-info">
                <h1 className="prints-title"><span>A1</span> {t('prints', {ns: 'prints'})}</h1>
                <ol className="prints-list">
                    <li>{t('editionOf500', {ns: 'prints'})}</li>
                    <li>{t('printedOn250gmMattePaper', {ns: 'prints'})}</li>
                    <li>{t('signedAndNumbered', {ns: 'prints'})}</li>
                </ol>
                {store.printSelection.length > 0 && (
                    <Link href="/checkout" className="cart-container">
                        <p>{store.printSelection.length}</p>
                        <Cart />
                    </Link>
                )}
                <div 
                    className="prints-select-view"
                    onClick={() => setMega(state => ({ ...state, megaGlobe: !state.megaGlobe }))}
                >
                    <Switch />
                    <p>{!mega.megaGlobe ? `${t('galleryView', {ns: 'prints'})}` : `${t('listView', {ns: 'prints'})}`}</p>
                </div>
            </div>
            
            <GalleryView 
                dragAndDrop={t('dragAndDrop', {ns: 'prints'})}
                scroll={t('scroll', {ns: 'prints'})}
                shuffledPrints={props.shuffledPrints}
                drop={t('dropHere', {ns: 'prints'})}
                directFromStudio={t('directFromTheStudio', {ns: 'prints'})}
                studioTour={t('studioTour', {ns: 'prints'})}
                yourSelection={t('yourSelection', {ns: 'prints'})}
                withinEU={t('freeShippingWithinTheEU')}
                worldwide={t('freeShippingWorldwide')}
                checkout={t('checkout', {ns: 'prints'})}
                remove={t('remove', {ns: 'prints'})}
            />
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
      shuffledPrints: shuffle(prints)
    },
  }
}
