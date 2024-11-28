import React, { createContext, useContext, useState } from "react";

interface ModalContextInterface {
    modalState: number
    setModalState: React.Dispatch<React.SetStateAction<number>>
}

const ModalContext = createContext<ModalContextInterface | null>(null)

export function ModalContextProvider({children} : {children: React.ReactNode}) {
    const [ modalState, setModalState ] = useState<number>(1)

    return(
        <ModalContext.Provider value={{modalState, setModalState}}>
            { children }
        </ModalContext.Provider>
    )
}

export function useModalContext() {
    const context = useContext(ModalContext)

    if(!context) {
        throw new Error('Please use context inside provider')
    }

    return context
}