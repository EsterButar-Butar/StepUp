import { useEffect, useState } from "react";

import { fetchCareerDetail } from "../services/detailResultService";

export default function useCareerDetail(careerId) {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {

      try {
        if (!careerId) {
          throw new Error("Recommendation ID is required");
        }

        setLoading(true);
        setError(null);

        const result = await fetchCareerDetail(careerId);
        setData(result);

      } catch (err) {

        setError(
          err.message ||
          "Failed to load career detail"
        );

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
