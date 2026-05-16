import { getCareerDetail } from "../api/detailResultApi";

export const fetchCareerDetail = async (careerId) => {
  return await getCareerDetail(careerId);
};