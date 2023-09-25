import { useWindowSize } from '../helpers/useWindowSize'

import SwitchLang from './SwitchLang'
import Logo from "./Logo"
import Nav from "./Nav"
import NavMobile from './NavMobile'

const Header = ({
    title={title}, 
    tagline={tagline},
    about={about},
    series={series},
    prints={prints},
    contact={contact}
}) => {
    const size = useWindowSize()

    return (
        <>
            <SwitchLang />
            <Logo 
                title={title}
                tagline={tagline}
            />
            {size.width > 600 ? (
                <Nav 
                    about={about}
                    series={series}
                    prints={prints}
                    contact={contact}
                /> 
            ): (
                <NavMobile
                    about={about}
                    series={series}
                    prints={prints}
                    contact={contact}
                /> 
            )}
        </>
    )
}

export default Header