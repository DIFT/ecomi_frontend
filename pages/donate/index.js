import Default from "../../components/Templates/Default"
import Image from 'next/image'
import veveQrCode from '../../public/assets/images/contributors/omitheclown/veve-qrcode.jpg'
import exchangeQrCode from '../../public/assets/images/contributors/omitheclown/exchange-qrcode.png'

const Donate = () => {

    return(
        <Default>
            <>
                <div className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto text-white">
                    <header className="space-y-6 mb-10 text-lg">
                        <h1 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Donate</h1>
                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-gray-400`}>You can support the work of the ECOMI Wiki community. This community website is ran not for profit and functions solely on the passion of its investors and collectors.</p>
                        <p className={`text-lg mb-8 font-medium text-gray-300`}>
                            <span className={`block uppercase text-sm font-medium text-gray-400 mb-2`}>Important</span>
                            We accept donations in the form of OMI tokens or NFTs. The QR codes displayed below belong to the contributors of the <a href={"https://github.com/alienbuild/ecomi_frontend"} target={"_blank"} className={`text-pink-500`}>front end</a> and <a href={"https://github.com/alienbuild/ecomi_backend"} target={"_blank"} className={`text-pink-500`}>back end</a> GitHub repository and are displayed to you at random, with a higher frequency of display rate to the most active monthly contributors.
                        </p>
                    </header>

                    <section>
                        <h2 className={`text-2xl mb-3`}>VEVE QR Code</h2>
                        <small className={`text-sm font-semibold tracking-wide uppercase mb-2 text-gray-300 block`}>Donate VEVE NFTs</small>
                        <span className={`mt-5 bg-gray-900 p-5 inline-block`}>
                                <Image src={veveQrCode} alt={`VEVE QR Code`} width={`200`} height={`200`} />
                            </span>
                    </section>


                    <section className={`mt-10`}>
                        <h2 className={`text-2xl mb-3`}>OMI Tokens QR Code</h2>
                        <small className={`text-sm font-semibold tracking-wide uppercase mb-2 text-gray-300 block`}>Donate OMI tokens</small>
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