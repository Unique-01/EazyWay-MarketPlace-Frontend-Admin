// components/Notification.js
import React, { useContext } from "react";
import { NotificationContext } from "context/NotificationContext";

const Notification = () => {
    const { notification } = useContext(NotificationContext);

    if (!notification) return null;

    return (
        <div className={`alert alert-${notification.type}`}>
            {notification.message}
        </div>
    );
};
export default Notification;
