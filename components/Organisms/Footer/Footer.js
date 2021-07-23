import Image from "next/image";
import Link from "next/link"
import dynamic from 'next/dynamic'

const LinkIcon = dynamic(() => import('../../Misc/LordIcon').then((mod) => mod.LinkIcon), {
    ssr: false
});


const DonateIcon = dynamic(() => import('../../Misc/LordIcon').then((mod) => mod.DonateIcon), {
    ssr: false
});

const Footer = () => {
    return(
        <>
            <footer className={`bg-gray-800 text-white bg-gray-900 py-20 border-t border-black mt-20`}>
                <div className=" container grid grid-cols-4 gap-10 relative place-items-center">

                    <div className={`relative`}>
                        <Image
                            src={`/assets/images/ecomi-art.png`}
                            alt="Ecomi Investors logo"
                            width={400}
                            height={326}
                            className={`absolute top-0`}
                        />
                    </div>
                    <div className="col-span-2">
                        <span className={`ecomiFont flex align-center items-center`}>
                            <Image
                                src="/assets/images/ecomi-rings-white.svg"
                                alt="Ecomi Investors logo"
                                width={50}
                                height={50}
                                className={`inline-block mr-2`}
                            />
                            <span className={`font-semibold text-2xl text-white inline-block ml-2`}>ECOMI</span>
                            <span className={`text-gray-300 text-2xl font-medium inline-block ml-1`}>WIKI</span>
                        </span>

                        <small className={`text-sm mt-5 text-gray-400 block`}>ECOMI WIKI is an <strong>unofficial</strong> site and is not in any way affiliated with ECOMI, VEVE or any of the brands or licensors mentioned. ECOMI WIKI is an open source community driven site ran not for profit. </small>
                        <small className={`text-sm mt-5 text-gray-400 block`}>No content on this site should be considered financial advice and is for entertainment purposes only. Although we do attempt to verify each claim through various sources your own research is strongly advised.</small>
                        <Link href={`/donate`}><a>
                            <DonateIcon
                                palette={`#CCCCCC;#db2777;`}
                                params={`40`}
                            />
                        </a></Link>

                    </div>
                    <div>
                        <h6 className={`mb-3 font-medium text-gray-300`}>Quick links</h6>

                        <ul className={`text-sm`}>
                            <li className={`mb-2`}>
                                <Link href={"/marketplace/floors"} ><a className={`py-2`}>
                                    <LinkIcon />
                                    <span className={`leading-6 ml-2 text-pink-600`}>Marketplace Floors</span>
                                </a></Link>
                            </li>
                            {/*<li className={`mb-2`}>*/}
                            {/*    <Link href={"/metrics"}><a className={`py-2`}>*/}
                            {/*        <LinkIcon />*/}
                            {/*        <span className={`leading-6 ml-2 text-pink-600`}>Metrics</span>*/}
                            {/*    </a></Link>*/}
                            {/*</li>*/}
                            {/*<li className={`mb-2`}>*/}
                            {/*    <Link href={"/"}><a className={`py-2`}>*/}
                            {/*        <LinkIcon />*/}
                            {/*        <span className={`leading-6 ml-2 text-pink-600`}>Press Package</span></a>*/}
                            {/*    </Link>*/}
                            {/*</li>*/}
                            <li className={`mb-2`}>
                                <Link href={"https://drive.google.com/file/d/1UNE-EvjuMIaWJUfvF3qQiTe0OKLFAJXV/view"}><a className={`py-2`}>
                                    <LinkIcon />
                                    <span className={`leading-6 ml-2 text-pink-600`}>Official Whitepaper</span></a>
                                </Link>
                            </li>
                            <li className={`mb-2`}>
                                <Link href={"/collectibles"}><a className={`py-2`}>
                                    <LinkIcon />
                                    <span className={`leading-6 ml-2 text-pink-600`}>Collectibles</span></a>
                                </Link>
                            </li>
                            {/*<li className={`mb-2`}>*/}
                            {/*    <Link href={"/"}><a className={`py-2`}>*/}
                            {/*        <LinkIcon />*/}
                            {/*        <span className={`leading-6 ml-2 text-pink-600`}>Brands</span></a>*/}
                            {/*    </Link>*/}
                            {/*</li>*/}
                            <li className={`mb-2`}>
                                <Link href={"/tokenomics"}><a className={`py-2`}>
                                    <LinkIcon />
                                    <span className={`leading-6 ml-2 text-pink-600`}>Tokenomics</span></a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"https://github.com/alienbuild/ecomi_frontend"}><a className={`py-2`}>
                                    <LinkIcon />
                                    <span className={`leading-6 ml-2 text-pink-600`}>GitHub</span></a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </footer>
        </>
    )
}

export default Footer