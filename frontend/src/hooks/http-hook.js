import { useCallback } from "react";

export const useHttpClient = () => {
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        headers = {
          "Content-Type": "application/json",
          ...headers,
        };

        const res = await fetch(url, {
          method,
          body,
          headers,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }
        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },
    [],
  );

  return { sendRequest };
};
