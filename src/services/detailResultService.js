import { getCareerDetail } from "../api/detailResultApi";

export const fetchCareerDetail = async (careerId) => {
  try {

    const data = await getCareerDetail(
      careerId
    );

    return data;

  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch recommendation";

    throw new Error(message, { cause: error });
  }
};
