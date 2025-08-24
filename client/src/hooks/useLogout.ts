import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import axios from "axios";
import { useState } from "react";

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const logoutUser = async () => {
    setLoading(true);

    try {
      await axios.post(
        "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      dispatch(logout());
      setLoading(false);
    }
  };

  return { logoutUser, loading };
}
