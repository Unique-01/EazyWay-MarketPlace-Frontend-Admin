import React, { createContext, useState, useEffect, useContext } from "react";
import config from "config";
import { apiClient } from "api/apiClient";
import { AuthContext } from "./AuthContext";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: userLoading } = useContext(AuthContext);

    useEffect(() => {
        // Fetch product products from the backend (once)
        const fetchCustomers = async () => {
            if (!userLoading) {
                if (user && user.isAdmin) {
                    try {
                        const response = await apiClient.get(
                            `${config.API_BASE_URL}/user/manage-users?privilege=buyer`
                        );

                        const customerResponse = response.data.data.docs;
                        const sortedCustomers = [...customerResponse].sort(
                            (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                        );
                        setCustomers(sortedCustomers);
                    } catch (error) {
                        console.error("Error fetching customers:", error);
                    } finally {
                        setLoading(false);
                    }
                }
            }
        };

        fetchCustomers();
    }, [user, userLoading]);

    return (
        <CustomerContext.Provider value={{ customers, loading }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomer = () => useContext(CustomerContext);

export default CustomerContext;
