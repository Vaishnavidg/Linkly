
import { useState, useEffect, useCallback } from "react";

const API_URL =
    import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

interface User {
    id: string;
    name: string;
    email: string;
}

export const useAuth = () => {
    console.log("useAuth hook is called");
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("token")
    );
    const [user, setUser] = useState<User | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        console.log("useEffect started");
    
        const checkAuth = async () => {
            console.log("Checking authentication...");
            console.log("Token:", token);
    
            if (!token) {
                setUser(null);
                setReady(true);
                return;
            }
    
            try {
                const response = await fetch(`${API_URL}/user/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                console.log("Response status:", response.status);
    
                const data = await response.json();
                console.log("Response data:", data);
    
                if (response.ok) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("API error:", error);
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

    return {
        token,
        user,
        ready,
        signOut,
    };
};
