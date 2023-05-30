import { useState } from 'react'

import Link from 'next/link'

import Globe from '../svg/Globe'
import Cancel from '../svg/Cancel'

const Nav = ({ about, series, prints, contact }) => {
    const [navOpen, setNavOpen] = useState(true)

    return (
        <div className="navigation-container">
            <div className="nav-cancel" onClick={() => setNavOpen(!navOpen)}>
                <Cancel navOpen={navOpen} />
            </div>
            <section className={navOpen ? "navigation" : "navigation navigation-off"}>
                <Link className="nav-link" href="/about">{about}</Link>
                <Link className="nav-link" href="/series">{series}</Link>
                <Link className="nav-link" href="/prints">{prints}</Link>
                <Link className="nav-link" href="/contact">{contact}</Link>
                <Link className="link globe" href="/">
                    <Globe />
                </Link>
            </section>
            <div className={navOpen ? "nav-background-dark" : "nav-background-dark nav-background-dark-off"} />
        </div>
    )
}

export default Nav