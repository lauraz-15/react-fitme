import { createContext, useContext, useEffect, useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useCurrUser } from "./CurrUserContext";
// import { useCurrUser } from '../../contexts/CurrUserContext'

export const AccountDataContext = createContext();
export const SetAccountDataContext = createContext();

export const useAccountData = () => useContext(AccountDataContext);
export const useSetAccountData = () => useContext(SetAccountDataContext);

export const AccountDataProvider = ({ children }) => {
    const [accountData, setAccountData] = useState({
        pageAccount: { results: [] }
      });
    
    const currUser = useCurrUser();
    const handleFollow = async (selectedAccount) => {
      try {
        const {data} = await axiosRes.post('/followers/', {
          followed: selectedAccount.id
        })
      } catch(err) {
        console.log(err)
      }
     }

      return (
        <AccountDataContext.Provider value={accountData}>
            <SetAccountDataContext.Provider value={{setAccountData, handleFollow}}>
                {children}
            </SetAccountDataContext.Provider>
        </AccountDataContext.Provider>
      )
}