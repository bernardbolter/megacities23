import { useContext } from 'react'
import { StoreContext } from '../providers/storeProvider'
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Header from '../components/Header'

const Cart = () => {
    const [store, setStore] = useContext(StoreContext)
    const { t } = useTranslation()

    return (
        <div className="cart-container">
            <Header
                title={t("megacities")}
                tagline={t("compositeCountryPortraits")}
                about={t("about")}
                series={t("series")}
                prints={t("prints")}
                contact={t("contact")}
            />
            <div className="cart-info-container">
                <h1>Shopping Cart</h1>
                
                    {store.printSelection.length !== 0 ? (
                        <div className="cart-items-container">
                            {store.printSelection.map(print => (
                                <div className="cart-print-container">
                                    {print.name}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="cart-no-prints">
                            <p>no prints in shopping cart</p>
                        </div>
                    )}
                    <div className="cart-total-container">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart

export async function getStaticProps({ locale = "en" }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "prints"]))
    },
  };
}