import { useCallback, useEffect, useState } from "react";

import { API_URL } from "../api/config";

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setUser(null);
        setReady(true);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(response.ok ? data.user : null);
      } catch {
        setUser(null);
      } finally {
        setReady(true);
      }
    };

    checkAuth();
  }, [token]);

  const signOut = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setReady(true);
  }, []);

  return { token, user, ready, signOut };
};
