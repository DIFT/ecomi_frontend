import React, { useEffect, useState } from 'react'
import { API } from "../../../config"
import dynamic from "next/dynamic"
import { getMarketData } from "../../../actions/metrics/metrics"
import moment from "moment"
import {getEditionTypeThresholds, getPercentageChange, getRarityThresholds} from "../../../utils"
import { useTranslation } from 'react-i18next'
import LoadingSpinner from '../../Atoms/LoadingSpinner/LoadingSpinner'
// const MicroChart = dynamic(
//     () => import("../../../components/Atoms/MicroChart/MicroChart"),
//     { ssr: false }
// );

const DataTable = dynamic(
    () => import("../../crud/DataTable"),
    { ssr: false }
);

const CollectibleFloors = () => {

    const { t } = useTranslation();

    const [marketData, setMarketData] = useState()
    const [loading, setLoading] = useState(true)
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        loadMarketData()
    },[])

    const loadMarketData = () => {
        getMarketData()
            .then(data => {
                setMarketData(data)
                setLoading(false)
            })
            .catch(e => console.log('Error getting marketplace data'))
    }

    const columns = React.useMemo(
        () => [
            {
                Header: t('collectibleFloors.name'),
                accessor: 'name', 
                Cell: (cellProps => {
                    return (
                        <>
                            <div className="flex items-center">

                                <div className={`w-16 h-16 mr-3 rounded-xl shadow border-2 hover:border-4 hover:border-pink-500 border-black`} style={{
                                    background: `url(${cellProps.row.original.image?.thumbnailUrl})`,
                                    backgroundPosition: '50%',
                                    backgroundSize: 'cover'
                                }}></div>
                                <div>
                                    <span>{cellProps.row.original.name}</span>
                                    <br/>
                                    <span className={`inline-block px-1 text-xs font-bold rounded ${getRarityThresholds(cellProps.row.original.rarity)}`}>
                                       {cellProps.row.original.rarity}
                                    </span>
                                    <span className={`inline-block px-1 text-xs font-bold rounded ml-1 ${getEditionTypeThresholds(cellProps.row.original.editionType)}`}>
                                        {cellProps.row.original.editionType}
                                    </span>
                                </div>
                            </div>

                        </>
                    )
                })
            },
            {
                Header: t('collectibleFloors.gain'),
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
                Header: t('collectibleFloors.store'),
                accessor: 'storePrice',
                Cell: (cellProps => (
                    <span>${cellProps.row.original.storePrice}</span>
                ))
            },
            {
                Header: t('collectibleFloors.lastSold'),
                accessor: 'metrics.prevSold.price',
                Cell: (cellProps => (
                    <>
                        <span>${cellProps.row.original.metrics.prevSold.price.toLocaleString()} <span className={`text-xs text-gray-300`}>({cellProps.row.original.editionType}#{cellProps.row.original.metrics.prevSold.issueNumber})</span></span>
                        <span className={`block text-xs text-gray-300`}>{moment(cellProps.row.original.metrics.prevSold.createdAt).fromNow()}</span>
                    </>
                ))
            },
            // {
            //   Header: 'pulse',
            //   accessor: '',
            //   disableSortBy: true,
            //   Cell: (cellProps => {
            //       return <MicroChart id={cellProps.cell.row.original.collectibleId} storePrice={cellProps.row.original.storePrice} floorPrice={cellProps.row.original.metrics.lowestPrice} />
            //   })
            // },
            {
                Header: t('collectibleFloors.issueNo'),
                accessor: 'metrics.issueNumber',
                Cell: (cellProps) => (
                    <span className={`font-medium`}>{cellProps.row.original.metrics.issueNumber} <span className={`text-sm text-gray-300 font-normal`}>{t(`collectibleFloors.of`)} {cellProps.row.original.totalIssued}</span></span>
                )
            },
            {
                Header: t('collectibleFloors.brand'),
                accessor: 'brand.name',
                disableSortBy: true,
                Cell: (cellProps => (
                    <img src={cellProps.row.original.brand.squareImage.thumbnailUrl} alt={cellProps.row.original.brand.name} width={`50`} className={`rounded-full border border-black shadow`} />
                ))
            },
            {
                Header: t('collectibleFloors.total'),
                accessor: 'metrics.totalListings'
            },
            {
                Header: t('collectibleFloors.listed'),
                accessor: 'metrics.createdAt',
                Cell: (cellProps => {
                    return moment(cellProps.row.original.metrics.createdAt).fromNow()
                })
            },
        ],
        []
    )

    const renderTable = () => {
        return (
            <>
                <span className={`block mb-3 text-xs text-gray-300`}>{t(`floors.lastUpdate`)}: {moment(marketData && marketData[0].updatedAt).format('LLL')}</span>
                {marketData && marketData ? <DataTable
                    columns={columns}
                    data={marketData}
                    loading={loading}
                    pageCount={pageCount}
                /> : null}
            </>
        )
    }


    return(
        <div className="grid grid-cols-1 mt-10 text-white px-5">
            {loading ? <LoadingSpinner /> : renderTable()}
        </div>
    )
}

export default CollectibleFloors