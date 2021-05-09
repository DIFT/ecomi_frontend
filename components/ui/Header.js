import { useState } from 'react'
import { APP_NAME } from '../../config'
import { signout, isAuth } from "../../actions/auth"
import NProgress from 'nprogress'
import Link from "next/link"
import Router from "next/router"
import Search from "../blog/Search"

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

import dynamic from 'next/dynamic';
const DynamicLordIcon = dynamic(() => import('../../components/LordIcon'), {
    ssr: false
});

const Header = () => {



    return(
        <>
            <DynamicLordIcon />
            {/*<header>*/}
            {/*    {APP_NAME}*/}
            {/*</header>*/}
        </>
    )
}

export default Header

// <li><Link href={"/"}><a>
//     <lord-icon
// animation="loop"
// target="a"
// palette="#CCCCCC;#ff2696;"
// size={'50px'}
// params="50"
// src={`./assets/icons/489-rocket-space/489-rocket-space-outline.json`}>
// </lord-icon>
// <strong>Website</strong>
// Development
// </a></Link></li>