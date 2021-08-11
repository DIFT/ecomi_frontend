import Default from "../../../components/Templates/Default"
import { API } from "../../../config"
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import { getMarketData } from "../../../actions/metrics/metrics"
import dynamic from "next/dynamic"
import moment from "moment"
import {getEditionTypeThresholds, getPercentageChange, getRarityThresholds} from "../../../utils"

const DataTable = dynamic(
    () => import("../../../components/crud/DataTable"),
    { ssr: false }
);

const MicroChart = dynamic(
    () => import("../../../components/Atoms/MicroChart/MicroChart"),
    { ssr: false }
);

const Metrics = () => {

    const [marketData, setMarketData] = useState()

    useEffect(() => {
        loadMarketData()
    },[])

    const loadMarketData = () => {
        getMarketData()
            .then(data => {
                setMarketData(data)
            })
            .catch(e => console.log('Error getting marketplace data'))
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name', // accessor is the "key" in the data
            },
            {
                Header: 'Floor Price (%Gain)',
                accessor: 'metrics[0].lowestPrice',
                Cell: (cellProps) => (
                    <>
                        <span className={`font-medium`}>${cellProps.row.original.metrics[0].lowestPrice.toLocaleString()}</span>
                        {getPercentageChange(cellProps.row.original.metrics[0].lowestPrice,cellProps.row.original.storePrice)}
                    </>
                )
            },
            {
                Header: 'Store Price',
                accessor: 'storePrice',
                Cell: (cellProps => (
                    <span>${cellProps.row.original.storePrice}</span>
                ))
            },
            {
              Header: 'Chart',
              accessor: '',
              Cell: (cellProps => (
                  <MicroChart id={(Math.random() + 1).toString(36).substring(7)} values={[
                      {"date": new Date(2018, 0, 1, 8, 0, 0), "value": "1"},
                      {"date": new Date(2018, 0, 1, 9, 0, 0), "value": "3"},
                      {"date": new Date(2018, 0, 1, 10, 0, 0), "value": "2"},
                      {"date": new Date(2018, 0, 1, 11, 0, 0), "value": "6"},
                      {"date": new Date(2018, 0, 1, 12, 0, 0), "value": "4"},
                      {"date": new Date(2018, 0, 1, 13, 0, 0), "value": "5"},
                  ]} />
              ))
            },
            {
                Header: 'Issue Number',
                accessor: 'metrics[0].issueNumber',
                Cell: (cellProps) => (
                    <span className={`font-medium`}>{cellProps.row.original.metrics[0].issueNumber} <span className={`text-sm text-gray-300 font-normal`}>of {cellProps.row.original.totalIssued}</span></span>
                )
            },
            {
                Header: 'Rarity',
                accessor: 'rarity',
                Cell: (cellProps => (
                    <span className={`inline-block px-1 text-xs font-bold rounded ${getRarityThresholds(cellProps.row.original.rarity)}`}>
                        {cellProps.row.original.rarity}
                    </span>
                ))
            },
            {
                Header: 'Brand',
                accessor: 'brand'
            },
            {
                Header: 'Edition Type',
                accessor: 'editionType',
                Cell: (cellProps => (
                    <span className={`inline-block px-1 text-xs font-bold rounded ml-1 ${getEditionTypeThresholds(cellProps.row.original.editionType)}`}>
                        {cellProps.row.original.editionType}
                    </span>
                ))
            },
            {
                Header: 'Total Listed',
                accessor: 'metrics[0].totalListings'
            },
            {
                Header: 'Listed',
                accessor: 'metrics[0].createdAt',
                Cell: (cellProps => {
                    return moment(cellProps.row.original.metrics[0].createdAt).fromNow()
                })
            },
        ],
        []
    )

    return(
        <Default>
            <>
                <div className="container text-white px-10">
                    <h1 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Marketplace Analytics</h1>
                    <p className={`font-semibold text-2xl leading-relaxed`}>Smart data table automatically updated every hour</p>

                    <p className={`block text-base text-gray-300`}>
                        The table below showcases the floor price (lowest available) for all collectibles currently listed on the secondary market with a 'buy it now' option.
                    </p>
                </div>

                <div className="grid grid-cols-1 mt-10 text-white px-5">
                    <span className={`block mb-3 text-xs text-gray-300`}>Last updated: {moment(marketData && marketData[0].updatedAt).format('LLL')}</span>
                    {marketData && marketData ? <DataTable columns={columns} data={marketData} /> : null}
                </div>
            </>
        </Default>
    )
}

export default Metrics