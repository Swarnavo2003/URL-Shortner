import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type ShortUrl } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { setLink } from "@/store/slices/linkSlice";
import { useEffect } from "react";

const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;

export const useFetchLinks = () => {
  const disptach = useAppDispatch();

  const query = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE}/short-url/all`);
      return response.data.data as ShortUrl[];
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      disptach(setLink(query.data));
    }
  }, [query.data, disptach]);

  return query;
};
