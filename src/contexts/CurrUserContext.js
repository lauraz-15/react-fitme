import axios from 'axios';
import { createContext, useContext, useEffect, useState } from "react";


export const CurrUserContext = createContext()
export const SetCurrUserContext = createContext()

export const useCurrUser = () => useContext(CurrUserContext)
export const useSetCurrUser = () => useContext(SetCurrUserContext)

export const CurrUserProvider = ({children}) => {
    const [currUser, setCurrUser] = useState(null)

    const handleMount = async () => {
      try {
        const {data} = await axios.get('dj-rest-auth/user/')
        setCurrUser(data)
      } catch(err) {
        console.log(err)
      }
    }
  
    useEffect(() => {
      handleMount()
    }, [])

    return (
        <CurrUserContext.Provider value={currUser}>
            <SetCurrUserContext.Provider value={setCurrUser}>
                {children}
            </SetCurrUserContext.Provider>
        </CurrUserContext.Provider>
    )
}