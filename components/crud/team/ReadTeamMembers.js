import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from "next/router"
import moment from "moment"
import { getCookie, isAuth } from "../../../actions/auth"
import { list, removeTeamMember } from "../../../actions/team/member"
import DataTable from "../DataTable";
import { API } from "../../../config"

const ReadTeamMembers = () => {

    const [members, setMembers] = useState([])
    const [message, setMessage] = useState('')
    const token = getCookie('token')

    useEffect(() => {
        loadTeamMembers()
    },[])

    const loadTeamMembers = () => {
        list()
            .then((data) => {
                if (data.error){
                    console.log('Error loading members: ', data.error)
                } else {
                    setMembers(data)
                }
            })
    }

    const deleteMember = (slug) => {
        removeTeamMember(slug, token)
            .then(data => {
                if (data.error){
                    console.log('Error deleting member: ', data.error)
                } else {
                    setMessage(data.message)
                    loadTeamMembers()
                }
            })
    }

    const deleteConfirm = (slug) => {
        let answer = window.confirm('Are you sure you want to delete this?')
        if (answer){
            deleteMember(slug)
        }
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
                    console.log('name props: ', cellProps)
                    return <><img src={`${API}/team/photo/${cellProps.cell.row.original.slug}`} alt={cellProps.row.original.name} className={`mr-3 border border-gray-900 rounded-full inline-block`} width={`40`} /> {cellProps.cell.value} </>
                })
            },
            {
                Header: 'Job title',
                accessor: 'title',
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
                    console.log('Cell props are: ', cellProps)
                    return(
                        <ul>
                            <li className={`inline-block`}><a href={`/admin/crud/team/${cellProps.row.original.slug}`} className={`leading-6 text-pink-600`}>Edit</a></li>
                            <li className={`inline-block ml-3`}><button className={`leading-6 text-pink-600`} onClick={() => deleteConfirm(cellProps.data[0].slug)}>Delete</button></li>
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
                <a href={`/admin/crud/team/member`} className={`uppercase bg-pink-600 font-bold text-xs px-3 py-2 rounded mr-3 mb-3 inline-block`}>Add team member</a>
            </div>
            <DataTable columns={columns} data={members} />
        </>
    )
}

export default ReadTeamMembers


