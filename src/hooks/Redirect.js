
import { useHistory } from "react-router";
import axios from "axios";
import { useEffect } from "react";


export const Redirect = (authStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (authStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        if (authStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, authStatus]);
};