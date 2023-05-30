import { useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Logo from '../components/Logo'
import Nav from '../components/Nav'
import SwitchLang from '../components/SwitchLang'
import Typewriter from "../components/Typewriter"

import Globe from '../components/Globe'

const theme = createTheme({
    palette: {
    mode: 'dark',
    primary: {
      main: '#ededed',
    },
    secondary: {
      main: '#cdcdcd',
    },
  },
  });

const Contact = (props) => {
    const { locale } = useRouter()
    const { t, i18n } = useTranslation(['common', 'contact'])
    // console.log(i18n.observers.languageChanged())
    const tooShort = useMemo(() => {
        return t('tooShort', { ns: 'contact '})
    }, [locale])
    // const tooShort = t('tooShort', { ns: 'contact '})
    const tooLong = t('tooLong', { ns: 'contact '})

    const theContactSchema = () => {
        return Yup.object().shape({
        name: Yup.string().min(2, t('tooShort', { ns: 'contact'})).max(50),
        email: Yup.string().email('invalid email'),
        message: Yup.string().min(2).max(50, 'too long')
    })}

    const schema = useMemo(() => theContactSchema(), [i18n]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: ''
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log("submitting")
            console.log(JSON.stringify(values, null, 2));
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <div className="contact-container">
                <Logo
                    title={t('megacities')}
                    tagline={t('compositeCountryPortaits')}
                    />
                <Nav 
                    about={t('about')}
                    series={t('series')}
                    prints={t('prints')}
                    contact={t('contact')}
                />
                <SwitchLang />
                <Typewriter />
                <div className="contact-text">
                    <h2>{t('contactText', {ns: 'contact' })}</h2>
                </div>
                <div className="contact-form">
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label={t('name', { ns: 'contact' })}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label={t('email', { ns: 'contact'})}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id="message"
                            name="message"
                            label={t('message', { ns: 'contact'})}
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            error={formik.touched.message && Boolean(formik.errors.message)}
                            helperText={formik.touched.message && formik.errors.message}
                        />
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            {t('submit', { ns: 'contact'})}
                        </Button>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Contact

export async function getStaticProps({ locale = 'en' }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common', 'contact'
        ])),
      },
    }
  }