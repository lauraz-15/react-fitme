import { createContext, useContext, useEffect, useState } from "react";
import { axiosRes } from "../api/axiosDefaults";


export const AccountDataContext = createContext();
export const SetAccountDataContext = createContext();

export const useAccountData = () => useContext(AccountDataContext);
export const useSetAccountData = () => useContext(SetAccountDataContext);

export const AccountDataProvider = ({ children }) => {
    const [accountData, setAccountData] = useState({
        pageAccount: { results: [] }
      });
    
  
    const handleFollow = async (selectedAccount) => {
      try {
        const {data} = await axiosRes.post("/followers/", {
          followed: selectedAccount.id  
        })

        setAccountData((prevState) => ({
          ...prevState,
          pageAccount: {
            results: prevState.pageAccount.results.map((account) => {
              return account.id === selectedAccount.id ? 
              {
                ...account,
                followers_count: account.followers_count + 1,
                following_id: data.id,
              } : account.is_owner ? 
              { ...account, following_count: account.following_count + 1  
              } : {
                account};
            })
        } 
      })) 
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