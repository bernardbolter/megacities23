import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Header from '../components/Header'

const Checkout = () => {
    const { t } = useTranslation()
    return (
        <div className="checkout-container">
            <Header 
                title={t('megacities')}
                tagline={t('compositeCountryPortraits')}
                about={t('about')}
                series={t('series')}
                prints={t('prints')}
                contact={t('contact')}
            />
            <h1>Checkout</h1>
        </div>
    )
}

export default Checkout

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