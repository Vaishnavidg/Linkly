const API_URL = import.meta.env.VITE_BACKEND_API_URL || "";

export const signupUser = async (username: string, email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/user/signup`, {
            method: "POST",
            body: JSON.stringify({
                name: username,
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        localStorage.setItem("token", data.token);

        if (!response.ok) {
            throw new Error(data.message || "Failed to sign up user");
        }

        return data;
    } catch (error) {
        console.error("Error signing up user:", error);
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        localStorage.setItem("token", data.token);

        if (!response.ok) {
            throw new Error(data.message || "Failed to log in user");
        }

        return data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};