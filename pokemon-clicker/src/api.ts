import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2", // Базовый URL для API покемонов
});

export const setupInterceptors = (router) => {
  api.interceptors.request.use(async (config) => {
    const authToken = Cookies.get("authToken");

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    } else {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post("/auth/refresh", {
            token: refreshToken,
          });
          const newAuthToken = response.data.authToken;

          Cookies.set("authToken", newAuthToken, { maxAge: 3600 });
          config.headers["Authorization"] = `Bearer ${newAuthToken}`;
        } catch (error) {
          console.error("Ошибка обновления токена", error);
          // Перенаправление на страницу входа
          router.push("/signin");
        }
      }
    }

    return router;
  });
};

export default api;
