import Link from "next/link";

const MarketListing = ({ children }) => {
    return(
        <>
            <main className={`overflow-x-hidden`}>
                <Link href={`/ecomi/marketplace`} className={`text-white`}><a>Back</a></Link>
                <span className={`ecomi__blue--radial-bg h-full fixed`}></span>
                {children}
            </main>
        </>
    )
}

export default MarketListing;