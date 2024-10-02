import { useState, useEffect } from "react";
import { API } from "./baseAxios"; // Assuming API is your Axios instance

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // Define supported methods
  headers?: Record<string, string>;
  body?: any;
}

const useFetchWithToken = <T>(
  url: string,
  token?: string | null,
  options?: FetchOptions
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...options?.headers,
        };

        if (token) {
          headers["Authorization"] = `${token}`;
        }

        const method = options?.method || "GET";
        const body = options?.body || null;

        const config = {
          headers,
        };

        let response;
        if (method === "GET") {
          response = await API.get(url, config);
        } else {
          response = await API({
            method,
            url,
            data: body,
            ...config,
          });
        }

        const result = response.data;
        setData(result);
        console.log(result);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token, options]);

  return { data, loading, error };
};

export default useFetchWithToken;
