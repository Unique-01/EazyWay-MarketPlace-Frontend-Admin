// context/NotificationContext.js
import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000); // Hide notification after 3 seconds
    };

    return (
        <NotificationContext.Provider
            value={{ notification, showNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
