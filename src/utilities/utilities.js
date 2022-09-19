import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreImages = async (info, setInfo) => {
  try {
    const { data } = await axiosReq.get(info.next);
    setInfo((prevInfo) => ({
      ...prevInfo,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevInfo.results),
    }));
  } catch (err) {}
};

export const setTokenStamp = (data) => {
  const refreshTokenStamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenStamp", refreshTokenStamp);
};

export const permittedRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenStamp");
};

export const removeTokenStamp = () => {
  localStorage.removeItem("refreshTokenStamp");
};

