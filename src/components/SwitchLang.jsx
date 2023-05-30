import { useState, useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import { useRouter } from 'next/router'
import Lang from '../svg/Lang'

import { returnFlag } from '@/helpers'

const SwitchLang = () => {
    const [mega] = useContext(MegaContext)
    const { locale , push, pathname } = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)

    const options = [
        'en',
        'de',
        'cn'
    ]

    const handleChange = l => {
        push(`${l === '' ? '' : l}${pathname}`, undefined, { locale: l })
        setMenuOpen(false)
    }

    return (
        <div className="switch-lang-container">
            <div 
                className="switch-lang-icon"
                onClick={() => setMenuOpen(!menuOpen)}    
            >
                <Lang />
            </div>
            {menuOpen && (
                <ul className="switch-menu">
                    {options.map(lang => {
                        if (lang !== locale) {
                            return (
                                <li 
                                    key={lang}
                                    className='switch-menu-item'
                                    onClick={() => {
                                        console.log("change lang")
                                        handleChange(lang)
                                    }}    
                                >
                                    <img src={`${mega.url}${returnFlag(lang)}`} alt={`flag of ${lang}`} />
                                </li>
                            )
                        }
                    })}
                </ul>
            )}
        </div>
    )
}

export default SwitchLang