import { useState, useEffect } from 'react'
import Router from 'next/router'
import { withRouter } from 'next/router'
import { XMasonry, XBlock } from "react-xmasonry"
import { getCookie, isAuth } from '../../../actions/auth'
import Default from "../../../components/Templates/Default"
import SelectCollectibleCard from '/components/Molecules/Cards/SelectCollectibleCard'
import { getFilteredProducts } from '../../../actions/apiCore'
import { getValuation } from '../../../actions/metrics/metrics'

const Valuation = ({ router }) => {

    const token = getCookie('token')
    const [valuation, setValuation] = useState(0)

    const [collectibles, setCollectibles] = useState([])
    const [loading, setLoading] = useState(true)
    const [myFilters, setMyFilters] = useState({
        filters: {
            price: []
        }
    })
    const [limit, setLimit] = useState(25)
    const [offset, setOffset] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

    const [values, setValues] = useState({
        error: '',
        success: '',
        formData: '',
        hideValuationButton: false
    });

    const { error, success, formData, hideValuationButton } = values;

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
    }, [router]);

    const loadFilteredResults = (newFilters) => {
        getFilteredProducts(offset, limit, newFilters).then( data => {
            if (data.error){
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setOffset(0);
            }
        })
    };

    const loadMore = () => {
        let toSkip = offset + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then( data => {
            if (data.error){
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setOffset(toSkip);
            }
        })
    };

    useEffect(() => {
        loadFilteredResults(offset, limit, myFilters.filters);
    }, [])

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className={`bg-transparent border border-white hover:bg-pink-700 hover:border-pink-500 text-white font-base py-2 px-4 rounded-full font-semibold text-xs mx-auto block`}>Load more</button>
            )
        )
    };

    const [checked, setChecked] = useState([])

    const handleToggle = (e, collectible) => {
        const clickedCollectible = checked.indexOf(collectible)
        const all = [...checked]
        if (!checked.some(person => person.collectibleId === collectible.collectibleId)) {
            all.push(collectible)
        } else {
            all.splice(clickedCollectible, 1)
        }
        setChecked(all)
        formData.set('collectibles', all)
    }

    const handleQuantity = (collectible) => {
        const all = [...checked]
        const newObjArr = all.map(obj => {
                if (collectible.collectibleId.includes(obj.collectibleId)) {
                    return {...obj, quantity: collectible.quantity}
                }
                return obj
            }
        )
        setChecked(newObjArr)
        formData.set('collectibles', all)
    }

    const calcValuation = e => {
        console.log('form data is: ' ,checked)
        e.preventDefault()
        getValuation(checked, token)
            .then(data => {
                if(data.error) {
                    console.log('Error getting valuation: ', data.error)
                    setValues({ ...values, error: data.error });
                } else {
                    setValuation(data.valuation)
                }
            })
    }

    return(
        <Default>
            <section className={`mt-0 px-10 pb-12 sm:pb-20 text-white relative min-h-screen flex items-center`}>
                <div className={`relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                    <div className="text-center">
                        <img src={`/assets/images/dunn.jpg`}  width={`150`} className={`mb-5 rounded-full mx-auto`}/>
                        <h1 className={`text-4xl sm:text-6xl lg:text-8xl leading-none font-semibold tracking-tight mb-8 sm:mb-10`}>Valuation</h1>
                        <p className={`font-semibold text-2xl leading-relaxed`}>
                            Vault valuations are based off of the current floor prices last captured by ecomiwiki. The result should only serve as a floor expectation for your collection, the calculation will not take into account your mint numbers, provenance, or any other variables that could influence price.
                        </p>
                    </div>
                </div>
            </section>

            <section className={`mt-0 px-10 pb-12 sm:pb-20 text-white relative flex items-center`}>
                <div className={`relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                    <p className={`font-normal text-xl`}>
                        Please click on each collectible you own, and be sure to enter the correct quantity of each collectible.
                    </p>
                </div>
            </section>

            <form onSubmit={calcValuation}>

                <section>
                    <XMasonry>
                        {filteredResults && filteredResults.map((collectible, index) => {
                            if (collectible.image.direction === "LANDSCAPE"){
                                return <XBlock width={2}><SelectCollectibleCard collectible={collectible} handleToggle={handleToggle} handleQuantity={handleQuantity} classes={`mb-5`} /></XBlock>
                            } else {
                                return <XBlock><SelectCollectibleCard collectible={collectible} handleToggle={handleToggle} handleQuantity={handleQuantity}  /></XBlock>
                            }
                        })}
                    </XMasonry>
                    {loadMoreButton()}
                </section>

                <footer className={`text-center p-5 text-white fixed w-full bottom-0 left-0 bg-gray-900 z-10 border-t border-black`}>
                    <small className={`block uppercase text-sm font-medium text-gray-300`}>Your vault is valued at:</small>
                    <p className={`font-normal text-xl text-green-500 font-medium text-3xl`}>${valuation.toLocaleString()}</p>
                </footer>

            </form>

        </Default>
    )
}

export default withRouter(Valuation);