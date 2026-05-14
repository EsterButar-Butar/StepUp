import { useEffect, useState } from "react";
import { getCareerDetail } from "../services/detailResultService";

export default function useCareerDetail(careerId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const result = await getCareerDetail(careerId);

        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [careerId]);

  return {
    data,
    loading,
    error,
  };
}