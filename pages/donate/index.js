import Default from "../../components/Templates/Default"
import Image from 'next/image'
import veveQrCode from '../../public/assets/images/contributors/omitheclown/veve-qrcode.jpg'
import exchangeQrCode from '../../public/assets/images/contributors/omitheclown/exchange-qrcode.png'
import { useTranslation } from 'react-i18next'

const Donate = () => {
    
    const { t } = useTranslation();

    return(
        <Default>
            <>
                <div className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto text-white">
                    <header className="space-y-6 mb-10 text-lg">
                        <h1 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>{t(`donate.title`)}</h1>
                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-gray-400`}>{t(`donate.support`)}</p>
                        <p className={`text-lg mb-8 font-medium text-gray-300`}>
                            <span className={`block uppercase text-sm font-medium text-gray-400 mb-2`}>{t(`donate.important`)}</span>
                            {t(`donate.accept`)} <a href={"https://github.com/alienbuild/ecomi_frontend"} target={"_blank"} className={`text-pink-500`}>{t(`donate.accept1`)}</a> {t(`donate.accept2`)} <a href={"https://github.com/alienbuild/ecomi_backend"} target={"_blank"} className={`text-pink-500`}>{t(`donate.accept3`)}</a> {t(`donate.accept4`)}
                        </p>
                    </header>

                    <section>
                        <h2 className={`text-2xl mb-3`}>{t(`donate.veveQR`)}</h2>
                        <small className={`text-sm font-semibold tracking-wide uppercase mb-2 text-gray-300 block`}>{t(`donate.donateVeve`)}</small>
                        <span className={`mt-5 bg-gray-900 p-5 inline-block`}>
                                <Image src={veveQrCode} alt={`VEVE QR Code`} width={`200`} height={`200`} />
                            </span>
                    </section>


                    <section className={`mt-10`}>
                        <h2 className={`text-2xl mb-3`}>{t(`donate.omiQR`)}</h2>
                        <small className={`text-sm font-semibold tracking-wide uppercase mb-2 text-gray-300 block`}>{t(`donate.donateOmi`)}</small>
                        <span className={`mt-5 bg-gray-900 p-5 inline-block`}>
                                    <Image src={exchangeQrCode} alt={`Exchange QR Code`} width={`200`} height={`200`} />
                                </span>
                    </section>
                </div>
            </>
        </Default>
    )
}

export default Donate