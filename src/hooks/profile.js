import { useEffect, useState } from "react";

import { fetchProfileData } from "../services/profileService";

export default function useProfile() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchProfileData();

        setData(result);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to load profile",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
