import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from "next/router"
import moment from "moment"
import { getCookie, isAuth } from "../../../actions/auth"
import { list, removeTeamMember } from "../../../actions/team/member"

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

    const showAllMembers = () => {
        return members.map((member, index) => {
            return (
                <li key={index}>
                    <h3>{member.name}</h3>
                    <small>Written by {member.author.name} | Published {moment(member.updatedAt).fromNow()}</small>
                    <button onClick={() => deleteConfirm(member.slug)}>Delete</button>
                    {showUpdateButton(member)}
                </li>
            )
        })
    }

    return(
        <>
            <h5>Update/Delete members</h5>
            {message && <div>{message}</div>}
            <ul>{showAllMembers()}</ul>
        </>
    )
}

export default ReadTeamMembers