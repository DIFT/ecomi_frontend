import Image from "next/image";
import Link from "next/link"

const Footer = () => {
    return(
        <footer id="f-primary" className={`text-white bg-gray-900 py-20 mt-20 border-t border-black`}>
            <div className=" container grid grid-cols-4 gap-10 relative place-items-center">
                <img src={`./assets/images/ecomi-art.png`}  width={`400px`} className={`absolute right-20 -top-48`}/>

                <div className="col-span-2">
                        <span className={`ecomiFont flex align-center items-center`}>
                            <Image
                                src="/assets/images/ecomi-rings-white.svg"
                                alt="Ecomi Investors logo"
                                width={50}
                                height={50}
                                className={`inline-block mr-2`}
                            />
                            <span className={`font-extrabold text-2xl text-white inline-block ml-2`}>ECOMI</span>
                            <span className={`text-gray-300 text-2xl font-medium inline-block ml-1`}>INVESTORS</span>
                        </span>

                    <small className={`text-sm mt-5 text-gray-400 block`}>ECOMI Investors is an <strong>unofficial</strong> site and is not in any way affiliated with ECOMI, VEVE or any of the brands or licensors mentioned. ECOMI Investors is an open source community driven site ran not for profit. </small>
                    <small className={`text-sm mt-5 text-gray-400 block`}>No content on this site should be considered financial advice and is for entertainment purposes only. Although we do attempt to verify each claim through various sources your own research is strongly advised.</small>
                </div>
                <div>
                    <h6 className={`mb-3 font-medium text-gray-300`}>Quick links</h6>

                    <ul className={`text-sm`}>
                        <li className={`mb-2`}><Link href={`/`}><a>Official Whitepaper</a></Link></li>
                        <li className={`mb-2`}><Link href={`/`}><a>Collectibles</a></Link></li>
                        <li className={`mb-2`}><Link href={`/`}><a>Brands</a></Link></li>
                        <li><Link href={`/`}><a>Tokenomics</a></Link></li>
                    </ul>
                </div>

            </div>
        </footer>
    )
}

export default Footer