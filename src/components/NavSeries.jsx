import Link from 'next/link'
import Globe from '../svg/Globe'

const NavSeries = ({ about, series, prints, contact }) => {

    return (
        <div className="nav-series-container">
            <section className="nav-series" >
                <Link className="nav-link" href="/about">{about}</Link>
                <Link className="nav-link" href="/series">{series}</Link>
                <Link className="nav-link" href="/prints">{prints}</Link>
                <Link className="nav-link" href="/contact">{contact}</Link>
                <Link className="link globe" href="/">
                    <Globe />
                </Link>
            </section>
        </div>
    )
}

export default NavSeries