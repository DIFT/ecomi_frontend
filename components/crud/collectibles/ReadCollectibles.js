import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from "next/router"
import moment from "moment"
import { getCookie, isAuth } from "../../../actions/auth"
import { list } from "../../../actions/collectibles/collectible"
import DataTable from "../DataTable";
import { API } from "../../../config"
import {getEditionTypeThresholds, getRarityThresholds} from "../../../utils";

const ReadCollectibles = () => {

    const [collectibles, setCollectibles] = useState([])
    const [message, setMessage] = useState('')
    const token = getCookie('token')

    useEffect(() => {
        loadCollectibles()
    },[])

    const loadCollectibles = () => {

        let offset = 0
        let limit = 500

        list(offset, limit)
            .then((data) => {
                if (data.error){
                    console.log('Error loading collectibles: ', data.error)
                } else {
                    setCollectibles(data)
                    console.log('Data for collectibles is: ', data)
                }
            })
    }

    const showUpdateButton = (member) => {
        if(isAuth() && isAuth().role === 0){
            return (
                <a href={`/user/crud/team/${member.slug}`}>Update</a>
            )
        } else if (isAuth() && isAuth().role === 1){
            return(
                <a href={`/admin/crud/team/${member.slug}`}>Update</a>
            )
        }
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name', // accessor is the "key" in the data
                Cell: (cellProps => {
                    //console.log('name props: ', cellProps)
                    return <>{cellProps.cell.value} </>
                })
            },
            {
                Header: 'Brand',
                accessor: 'brand.name'
            },
            {
                Header: 'Edition Type',
                accessor: 'editionType',
                Cell: (cellProps => (
                    <span className={`inline-block px-1 text-xxs font-medium rounded border ml-1 ${getEditionTypeThresholds(cellProps.cell.value)}`}>
                        {cellProps.cell.value !== null ? cellProps.cell.value : 'N/A'}
                    </span>
                ))
            },
            {
                Header: 'Rarity',
                accessor: 'rarity',
                Cell: (cellProps => (
                    <span className={`inline-block px-1 text-xxs font-medium rounded border ${getRarityThresholds(cellProps.cell.value)}`}>
                        {cellProps.cell.value}
                    </span>
                ))
            },
            {
                Header: 'Drop Date',
                accessor: 'dropDate',
                Cell: (cellProps) => {
                    return moment(cellProps.row.original.dropDate).fromNow()
                }
            },
            {
                Header: 'Last updated',
                accessor: 'updatedAt',
                Cell: (cellProps) => {
                    return moment(cellProps.row.original.updatedAt).fromNow()
                }
            },
            {
                Header: 'Actions',
                Cell: (cellProps) => {
                    return(
                        <ul>
                            <li className={`inline-block`}><a href={`/admin/crud/team/${cellProps.row.original.slug}`} className={`leading-6 text-pink-600`}>Edit</a></li>
                        </ul>
                    )
                }
            }
        ],
        []
    )


    return(
        <>
            {message && <div>{message}</div>}
            <div>
                <a href={`/admin/crud/team/member`} className={`uppercase bg-pink-600 font-bold text-xs px-3 py-2 rounded mr-3 mb-3 inline-block`}>Manually Add Collectible</a>
            </div>
            <DataTable columns={columns} data={collectibles} />
        </>
    )
}

export default ReadCollectibles


