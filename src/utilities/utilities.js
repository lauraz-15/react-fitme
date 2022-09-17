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