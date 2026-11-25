import { normalizeUrl } from "../lib/url";

const API_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

// Read at call time: a module-level read runs before sign-in and stays null.
const getToken = () => localStorage.getItem("token");
const authHeader = (): Record<string, string> => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getShortUrlApiUrlWithoutSignIn = async(url: string) => {
  console.log("url", url);
  try{
      if (!url) {
          throw new Error("Please enter a URL.");
      }
       const normalized = normalizeUrl(url);
      if (!normalized) {
          throw new Error("Please enter a valid URL, e.g. https://example.com");
      }
      console.log()
      const response = await fetch(`${API_URL}/urls`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              url: normalized,
            }),
           
      });
      console.log("Status:", response.status);
      console.log("Success:", response.ok);
  
      const data = await response.json();
      console.log("Backend JSON response:", data);

  if (!response.ok) {
    throw new Error(data.message || "Failed to shorten URL");
  }

  return data;
} catch (error) {
  console.error("Error shortening URL:", error);
  throw error;
}
};

export const getShortUrlApiUrl = async(url: string) => {
    try{
        if (!url) {
            throw new Error("Please enter a URL.");
        }
         const normalized = normalizeUrl(url);
        if (!normalized) {
            throw new Error("Please enter a valid URL, e.g. https://example.com");
        }
        const response = await fetch(`${API_URL}/url`, {
            method: "POST",
            body: JSON.stringify({
                url: url,
              }),
            headers: {
                "Content-Type": "application/json",
                ...authHeader()
            },

        });
        console.log("Status:", response.status);
        console.log("Success:", response.ok);
    
        const data = await response.json();
        console.log("Backend JSON response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to shorten URL");
    }

    return data;
  } catch (error) {
    console.error("Error shortening URL:", error);
    throw error;
  }
};

export const getUserUrls = async() => {
  console.log("api url", API_URL);
  try{
    const response = await fetch(`${API_URL}/user-urls`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          ...authHeader()
      },
    
  });

  console.log("Status:", response.status);
  console.log("Success:", response.ok);

  const data = await response.json();
  console.log("Backend JSON response:", data);

  if (!response.ok) {
    throw new Error(data.message || "Token is not valid");
  }
  return data;

  }catch(error){
    console.log("Error in fetching data", error);
    throw error;
  }

}

        

