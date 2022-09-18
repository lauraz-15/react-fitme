import { createContext, useContext, useEffect, useState } from "react";
// import { useCurrUser } from '../../contexts/CurrUserContext'

export const AccountDataContext = createContext();
export const SetAccountDataContext = createContext();

export const useAccountData = () => useContext(AccountDataContext);
export const useSetAccountData = () => useContext(SetAccountDataContext);

export const AccountDataProvider = ({ children }) => {
    const [accountData, setAccountData] = useState({
        pageAccount: { results: [] }
      });


      return (
        <AccountDataContext.Provider value={accountData}>
            <SetAccountDataContext.Provider value={setAccountData}>
                {children}
            </SetAccountDataContext.Provider>
        </AccountDataContext.Provider>
      )
}