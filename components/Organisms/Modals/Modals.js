import { useState } from 'react'
import dynamic from "next/dynamic"

// Icons
const CloseIcon = dynamic(() => import('/components/Misc/LordIcon').then((mod) => mod.CloseIcon), {
    ssr: false
});

const Modal = ({ children, modalState, setModalState,setControlOverflow }) => {


    return(
        <>
            {modalState ? (
                <div className={`fixed bg-black bg-opacity-75 z-50 inset-0 p-2`}>
                    <button className={`absolute right-3 text-white`} onClick={e => { setModalState(false); setControlOverflow(false) }}>
                        <CloseIcon size={`50px`} params={`150`} />
                    </button>
                    <div className="flex items-center align-center justify-center content-center text-white h-full">
                        <div className="p-10 bg-gray-900 border border-gray-700 rounded-md w-96">
                            {children}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Modal