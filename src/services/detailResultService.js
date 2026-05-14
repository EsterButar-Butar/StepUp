import API from "../api/detailResultApi";

export const getCareerDetail = async (careerId) => {
  const response = await API.get(`/careers/${careerId}`);
  return response.data;
};
