import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useWindowSize } from '../helpers/useWindowSize'

import SwitchLang from '../components/SwitchLang'
import Logo from "../components/Logo"
import Nav from "../components/Nav"
import NavMobile from '../components/NavMobile'
import Image from "next/image"

const About = () => {
  const { t } = useTranslation()
  const size = useWindowSize()

  return (
    <section className="about-container">
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

      <div className="about-content">
          <h1>{t('headline', { ns: 'about' })}</h1>
          <div classname="about-line" />
          <h2>{t('description', { ns: 'about' })}</h2>
        <div className="about-video-container">
          <div className="about-text">
            <h1>{t('tageline', { ns: 'about' })}</h1>
            <h1>{t('satellite', { ns: 'about' })}</h1>
            <h1>{t('endline', { ns: 'about' })}</h1>
          </div>
          <div className="about-video">
            <video width="720" height="2360" autoPlay loop>
              <source src="http://www.thefilterman.de/videos/megacities/deutscheStadt/deutscheStadt_overview_web.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <div className="about-exhibit">
        <p>
          Exhibition at <a href="http://circylar.com/">CIRCYLAR Gallery</a>,<br />
          Berlin, 2020
        </p>
        <div className="about-images">
          <div className="about-image">
            <Image
              src="https://thefilterman.de/exhibits/circylar2020/berlin_exhibit.jpg"
              alt="Exhibit at circylar gallery berlin 2020"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="about-image">
            <Image
              src="https://thefilterman.de/exhibits/circylar2020/berlin_exhibit2.jpg"
              alt="Exhibit at circylar gallery berlin 2020"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="about-image">
            <Image
              src="https://thefilterman.de/exhibits/circylar2020/berlin_exhibit3.jpg"
              alt="Exhibit at circylar gallery berlin 2020"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="about-image">
            <Image
              src="https://thefilterman.de/exhibits/circylar2020/berlin_exhibit4.jpg"
              alt="Exhibit at circylar gallery berlin 2020"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
      
        {/* <h2>
          <b>Megacities</b> presents a portrait of country though its
          topography.
          <br />
        </h2>
        <h2>
          From the vantage point of a satellite, we see the similarities of our
          cites and how we are all connected through streets, sidewalks, rivers,
          highways, and train tracks.
        </h2>
        <h2>
          But it is always the subtleties that make us unique, and by seeing our
          world connected from such a view, you can also see the differences
          within the similar.
        </h2>

        <h3>
          &quot;The first exhibition of the Megacities was at the skateboarding
          focused, <b>Circylar gallery</b>, in Berlin. For this exhibition I
          added the Skate City image to the series, which combines satellite
          images of famous skate spots and skateparks from the US.
        </h3>
        <h3>
          Growing up as a skateboarder, the city was my playground and adding
          this element to the series, I feel gives a better insight into what
          it&apos;s all about, a celebration of the urban.&quot;
        </h3>

        <h4>
          - <a href="https://bernardbolter.com">Bernard Bolter</a>
        </h4>

        <p>For any Inquiries or Questions:</p>
        <h5>bernardbolter@gmail.com</h5>
      </div> */}
    </section>
  );
};

export default About;

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'about'
      ])),
    },
  }
}
