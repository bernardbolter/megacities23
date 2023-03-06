import React, { useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import Link from 'next/link'

import Globe from '../svg/Globe'
import Instagram from '../svg/Instagram'
import Arrow from '../svg/Arrow'

const Nav = () => {
    const [mega, setMega] = useContext(MegaContext)

    return (
        <div className="navigation-container">
            <div 
                className={mega.navOpen ? 'arrows arrows-on' : 'arrows'}
                onClick={() => {
                    setMega(state=> ({ ...state, navOpen: !state.navOpen }))
                }}
                role="button"
                tabIndex={0}
            >
                <div className={mega.navOpen ? `'arrow first'` : 'arrow first first-on'}>
                    <Arrow />
                </div>
                <div className={mega.navOpen ? 'arrow second' : 'arrow second second-on'}>
                    <Arrow />
                </div>
                <div className={mega.navOpen ? 'arrow third' : 'arrow third third-on'}>
                    <Arrow />
                </div>
            </div>
            <section className={mega.navOpen ? 'navigation navigation-on' : 'navigation'}>
                <Link className={mega.navOpen ? 'link link-on globe' : 'link globe'} href="/">
                    <Globe />
                </Link>

                <Link className={mega.navOpen ? 'link link-on' : 'link'} href="/about">about</Link>
                <Link className={mega.navOpen ? 'link link-on' : 'link'} href="/series">series</Link>
                {/* <Link className={navigationOpen ? 'link link-on' : 'link'} to="/prints">prints</Link> */}
                {/* <Link className={navigationOpen ? 'link link-on' : 'link'} to="/contact">contact</Link> */}
                <a className={mega.navOpen ? 'link link-on instagram' : 'link instagram'} href="https://www.instagram.com/bernardbolter/">
                    <Instagram />
                </a>
            </section>
            <div className={mega.navOpen ? 'nav-background-dark nav-background-dark-open' : 'nav-background-dark'} />
        </div>
    )
}

export default Nav