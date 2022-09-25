import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";
import {
  permittedRefreshToken,
  removeTokenStamp,
} from "../utilities/utilities";

export const CurrUserContext = createContext();
export const SetCurrUserContext = createContext();

export const useCurrUser = () => useContext(CurrUserContext);
export const useSetCurrUser = () => useContext(SetCurrUserContext);

/**
 * Get current user data from the api
 */
export const CurrUserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrUser(data);
    } catch (err) {}
  };

  useEffect(() => {
    handleMount();
  }, []);

  /**
   * Refresh access token if user logged in
   * If user is not logged in, remove the token and direct the to the login page
   */
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (permittedRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/login");
              }
              return null;
            });
            removeTokenStamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/login");
              }
              return null;
            });
            removeTokenStamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrUserContext.Provider value={currUser}>
      <SetCurrUserContext.Provider value={setCurrUser}>
        {children}
      </SetCurrUserContext.Provider>
    </CurrUserContext.Provider>
  );
};
