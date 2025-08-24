import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { type CreateLinkRequest, type ShortUrl } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { addLink } from "@/store/slices/linkSlice";

const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;

export const useCreateLink = () => {
  const disptach = useAppDispatch();

  return useMutation({
    mutationFn: async (data: CreateLinkRequest) => {
      const response = await axios.post(`${API_BASE}/short-url/create`, data);
      return response.data.data;
    },
    onSuccess: (data: ShortUrl) => {
      const newLink: ShortUrl = {
        id: data.id,
        destination: data.destination,
        short_url: data.short_url,
        clicks: data.clicks,
        description: data.description || "",
        createdAt: data.createdAt,
      };

      disptach(addLink(newLink));
    },
  });
};
