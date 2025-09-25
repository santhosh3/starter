import React, { createContext, useState } from 'react';

export const TrelloContext = createContext();

export const TrelloProvider = ({ children }) => {

    let [board, setBoard] = useState({
        loading: true,
        data: [],
        error: null
    })

    let [list, setList] = useState({
        loading : true,
        data : [],
        error : null
    })

    return (
        <TrelloContext.Provider value={{board, setBoard, list, setList}}>
            {children}
        </TrelloContext.Provider>
    )
}