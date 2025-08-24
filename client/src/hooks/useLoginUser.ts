import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import type { User } from "@/types";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface LoginData {
  username?: string;
  email?: string;
  password: string;
}

interface AuthHookReturn {
  loading: boolean;
  error: string | null;
}

interface LoginHookReturn extends AuthHookReturn {
  loginUser: (data: LoginData) => Promise<void>;
}

export function useLogin(): LoginHookReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const loginUser = async (data: LoginData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
        data,
        {
          withCredentials: true,
        }
      );
      const user: User = response.data.data;
      toast.success(response.data.message);
      dispatch(setUser(user));
    } catch (error: unknown) {
      let errorMessage = "Login failed";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return { loading, error, loginUser };
}
