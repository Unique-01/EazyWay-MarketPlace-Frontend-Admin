import { apiClient } from "api/apiClient";
import config from "config";
import React, { createContext, useReducer, useEffect, useState } from "react";

// Create the Auth Context
export const AuthContext = createContext();

// Reducer function for handling login, logout, and user state updates
const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload.userData, // Store user info
                authToken: action.payload.authToken, // Store authToken
                isAuthenticated: true, // Mark the user as authenticated
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                authToken: null,
                isAuthenticated: false, // Clear user data and mark as not authenticated
            };
        case "SET_USER":
            return {
                ...state,
                user: action.payload, // Update user data (e.g., profile changes)
            };
        default:
            return state;
    }
};

// Initial state of the auth context
const initialState = {
    user: null,
    authToken: null,
    isAuthenticated: false,
};

// AuthProvider component to provide the AuthContext to the entire app
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            const fetchUser = async () => {
                const response = await apiClient.get(
                    `${config.API_BASE_URL}/user`
                );
                set_user(response.data.data);
            };
            fetchUser();
        }
    }, []);

    // Load user and authToken from localStorage on app load (to persist user session)
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("authToken");
        if (storedUser && storedToken) {
            dispatch({
                type: "LOGIN",
                payload: {
                    userData: JSON.parse(storedUser),
                    authToken: storedToken,
                },
            });
        }
        setLoading(false);
    }, []);

    // Login function to store user data and authToken
    const login = (userData, authToken) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", authToken);
        dispatch({
            type: "LOGIN",
            payload: {
                userData,
                authToken,
            },
        });
    };

    // Logout function to clear user data and authToken
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        dispatch({ type: "LOGOUT" });
    };

    const set_user = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch({
            type: "SET_USER",
            payload: userData,
        });
    };

    return (
        <AuthContext.Provider
            value={{ ...state, login, logout, loading, set_user }}>
            {children}
        </AuthContext.Provider>
    );
};
