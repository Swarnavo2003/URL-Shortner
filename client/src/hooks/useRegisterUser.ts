import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface RegisterData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: File;
}

interface AuthHookReturn {
  loading: boolean;
  error: string | null;
}

interface RegisterHookReturn extends AuthHookReturn {
  registerUser: (data: RegisterData) => Promise<void>;
}

export function useRegisterUser(): RegisterHookReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (data: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);

      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
    } catch (error: unknown) {
      let errorMessage = "Registration failed";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
}
