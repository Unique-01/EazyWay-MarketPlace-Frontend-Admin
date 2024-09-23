import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "context/AuthContext";
import { NotificationContext } from "context/NotificationContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

const AxiosSetup = () => {
    const { logout } = useContext(AuthContext);
    const { showNotification } = useContext(NotificationContext);
    const navigate = useNavigate();

    useEffect(() => {
        const setupInterceptors = () => {
            apiClient.interceptors.request.use(
                (config) => {
                    const authToken = localStorage.getItem("authToken");
                    if (authToken) {
                        config.headers["Authorization"] = authToken;
                    }
                    config.headers["frontend-source"] = "webadmin"
                    return config;
                },
                (error) => Promise.reject(error)
            );

            apiClient.interceptors.response.use(
                (response) => response,
                async (error) => {
                    if (error.response) {
                        // Handle 401 Unauthorized
                        if (error.response.status === 401) {
                            logout();
                            navigate("/login");
                        }

                        // Handle 403 Forbidden (account revoked)
                        if (error.response.status === 403) {
                            showNotification(
                                "You do not have the permission to perform this operation"
                            );
                            navigate("/login");
                            logout();
                        }
                    }

                    return Promise.reject(error);
                }
            );
        };

        setupInterceptors();
    }, [logout, navigate, showNotification]);
};

export default AxiosSetup;
