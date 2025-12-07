import { useState } from "react";

const useRequest = ({ url, method }) => {
  const [loading, setLoading] = useState(false);

  const sendRequest = async (body, customUrl) => {
    setLoading(true);
    const res = await fetch(url || customUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-bypass-token": import.meta.env.VITE_APP_API_KEY,
      },
      body: !!body && method !== "GET" ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    setLoading(false);
    return data;
  };

  return { loading, sendRequest };
};

export default useRequest;
