import { useRouter } from 'next/router'
import Link from 'next/link'
import Globe from '../svg/Globe'

const NavMobile = ({ about, series, prints, contact }) => {
    const router = useRouter()

    return (
        <div className="nav-mobile-container">
            <section className="nav-mobile" >
                <Link 
                    className={router.pathname === "/series" ? "nav-link-on nav-link" : "nav-link"}
                    href="/series"
                >{series}</Link>
                <Link 
                    className={router.pathname === "/prints" ? "nav-link nav-link-on" : "nav-link"}
                    href="/prints"
                >{prints}</Link>
                 <Link 
                    className={router.pathname === "/about" ? "nav-link nav-link-on" : "nav-link"}
                    href="/about"
                >{about}</Link>
                <Link 
                    className={router.pathname === "/contact" ? "nav-link nav-link-on" : "nav-link"}
                    href="/contact"
                >{contact}</Link>
                <Link 
                    className={router.pathname === "/" ? "link globe nav-link-on" : "link globe"}
                    href="/"
                >
                    <Globe />
                </Link>
            </section>
        </div>
    )
}

export default NavMobile