import { useHistory } from "react-router";
import axios from "axios";
import { useEffect } from "react";

/**
 * Refresh the access token for authorised user
 * Redirect user to the home page.
 * If user is not authorised, redirect to the homepage
 */
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
