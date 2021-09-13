import React, { useEffect, useState } from 'react'
import { API } from "../../../config"
import dynamic from "next/dynamic"
import { getMarketComicData } from "../../../actions/metrics/metrics"
import moment from "moment"
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

    useEffect(() => {
        loadMarketData()
    },[])

    const loadMarketData = () => {
        getMarketComicData()
            .then(data => {
                setMarketData(data)
                console.log('table data is: ' ,data)
            })
            .catch(e => console.log('Error getting marketplace data'))
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'comicSeries.name', // accessor is the "key" in the data
            },
            {
                Header: 'Floor Price (%Gain)',
                accessor: 'metrics.lowestPrice',
                Cell: (cellProps) => {
                    console.log('Cell props is: ', cellProps)
                    console.log('Metrics is: ', cellProps.row.original.metrics)
                    console.log('LP is: ', cellProps.row.original.metrics.lowestPrice)
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
                Header: 'Issue Number',
                accessor: 'metrics.issueNumber',
                Cell: (cellProps) => (
                    <span className={`font-medium`}>{cellProps.row.original.metrics.issueNumber} <span className={`text-sm text-gray-300 font-normal`}>of {cellProps.row.original.totalIssued}</span></span>
                )
            },
            {
                Header: 'Rarity',
                accessor: 'rarity',
                Cell: (cellProps => (
                    <span className={`inline-block px-1 text-xs font-bold rounded ${getRarityThresholds(cellProps.row.original.cover.rarity)}`}>
                        {cellProps.row.original.cover.rarity}
                    </span>
                ))
            },
            {
                Header: 'Total Listed',
                accessor: 'metrics.totalListings'
            },
        ],
        []
    )

    return(
        <div className="grid grid-cols-1 mt-10 text-white px-5">
            <span className={`block mb-3 text-xs text-gray-300`}>Last updated: {moment(marketData && marketData[0].updatedAt).format('LLL')}</span>
            {marketData && marketData ? <DataTable columns={columns} data={marketData} /> : null}
        </div>
    )
}

export default ComicFloors