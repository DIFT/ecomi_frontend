import React, { useEffect, useState } from 'react'
import { API } from "../../../config"
import dynamic from "next/dynamic"
import { getMarketComicData } from "../../../actions/metrics/metrics"
import moment from "moment"
import LoadingSpinner from '../../Atoms/LoadingSpinner/LoadingSpinner'
import {getEditionTypeThresholds, getPercentageChange, getRarityThresholds} from "../../../utils"


// const MicroChart = dynamic(
//     () => import("../../../components/Atoms/MicroChart/MicroChart"),
//     { ssr: false }
// );

const DataTable = dynamic(
    () => import("../../crud/DataTable"),
    { ssr: false }
);

const ComicFloors = () => {

    const [marketData, setMarketData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadMarketData()
    },[])

    const loadMarketData = () => {
        getMarketComicData()
            .then(data => {
                setMarketData(data)
                setLoading(false)
            })
            .catch(e => console.log('Error getting marketplace data'))
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name', // accessor is the "key" in the data
                Cell: (cellProps => {
                    return(
                        <>
                            <div className="flex items-center">
                                <div className={`w-16 h-16 mr-3 rounded-xl shadow border-2 hover:border-4 hover:border-pink-500 border-black`} style={{
                                    background: `url(${cellProps.row.original.cover.image?.thumbnailUrl})`,
                                    backgroundPosition: '50%',
                                    backgroundSize: 'cover'
                                }}></div>
                                <div>
                                    <span>{cellProps.row.original.name} #{cellProps.row.original.comicNumber}</span>
                                    <br/>
                                    <span className={`inline-block px-1 text-xs font-bold rounded ${getRarityThresholds(cellProps.row.original.cover.rarity)}`}>
                                       {cellProps.row.original.cover.rarity}
                                    </span>
                                </div>
                            </div>
                        </>
                    )
                })
            },
            {
                Header: 'Floor Price (%Gain)',
                accessor: 'metrics.lowestPrice',
                Cell: (cellProps) => {
                    return(
                        <>
                            <span className={`font-medium`}>${cellProps.row.original.metrics.lowestPrice.toLocaleString()}</span>
                            {getPercentageChange(cellProps.row.original.metrics.lowestPrice,cellProps.row.original.storePrice)}
                        </>
                    )
                }
            },
            {
                Header: 'Store Price',
                accessor: 'storePrice',
                Cell: (cellProps => (
                    <span>${cellProps.row.original.storePrice}</span>
                ))
            },
            {
                Header: 'Variant Issued',
                accessor: 'cover.totalIssued'
            },
            {
                Header: 'Total Issued',
                accessor: 'totalIssued'
            },
            // {
            //     Header: 'Prev Sold Price',
            //     accessor: 'metrics.prevSold.price',
            //     Cell: (cellProps => (
            //         <>
            //             <span>${cellProps.row.original.metrics.prevSold.price.toLocaleString()} <span className={`text-xs text-gray-300`}>({cellProps.row.original.editionType}#{cellProps.row.original.metrics.prevSold.issueNumber})</span></span>
            //             <span className={`block text-xs text-gray-300`}>{moment(cellProps.row.original.metrics.prevSold.createdAt).fromNow()}</span>
            //         </>
            //     ))
            // },
            // {
            //   Header: 'pulse',
            //   accessor: '',
            //   disableSortBy: true,
            //   Cell: (cellProps => {
            //       return <MicroChart id={cellProps.cell.row.original.collectibleId} storePrice={cellProps.row.original.storePrice} floorPrice={cellProps.row.original.metrics.lowestPrice} />
            //   })
            // },
            {
                Header: 'Total Listed',
                accessor: 'metrics.totalListings'
            },
        ],
        []
    )

    const renderTable = () => {
        return(
            <>
                <span className={`block mb-3 text-xs text-gray-300`}>Last updated: {moment(marketData && marketData[0].updatedAt).format('LLL')}</span>
                {marketData && marketData ? <DataTable columns={columns} data={marketData} /> : null}
            </>
        )
    }

    return(
        <div className="grid grid-cols-1 mt-10 text-white px-5">
            {loading ? <LoadingSpinner /> : renderTable()}
        </div>
    )
}

export default ComicFloors