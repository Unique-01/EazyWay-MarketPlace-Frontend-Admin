import React, { createContext, useState, useEffect, useContext } from "react";
import config from "config";
import { apiClient } from "api/apiClient";
import { AuthContext } from "./AuthContext";

const DashboardStatContext = createContext();

export const DashboardStatProvider = ({ children }) => {
    const [card, setCard] = useState();
    const [topSelling, setTopSelling] = useState();
    const [salesUsers, setSalesUsers] = useState();
    const [loading, setLoading] = useState(true);
    const { user, loading: userLoading } = useContext(AuthContext);

    useEffect(() => {
        // Fetch product products from the backend (once)
        const fetchStats = async () => {
            if (!userLoading) {
                if (user && user.isAdmin) {
                    try {
                        const [
                            cardResponse,
                            topSellingResponse,
                            salesUsersResponse,
                        ] = await Promise.all([
                            apiClient.get(
                                `${config.API_BASE_URL}/product/manage-stat?type=card`
                            ),
                            apiClient.get(
                                `${config.API_BASE_URL}/product/manage-stat?type=top-selling`
                            ),
                            apiClient.get(
                                `${config.API_BASE_URL}/product/manage-stat?type=sales-users`
                            ),
                        ]);

                        setCard(cardResponse.data.data);
                        setTopSelling(topSellingResponse.data.data);
                        setSalesUsers(salesUsersResponse.data.data);
                    } catch (error) {
                        console.error("Error fetching dashboard stats:", error);
                    } finally {
                        setLoading(false);
                    }
                }
            }
        };

        fetchStats();
    }, [user, userLoading]);

    return (
        <DashboardStatContext.Provider
            value={{ card, topSelling, salesUsers, loading }}>
            {children}
        </DashboardStatContext.Provider>
    );
};

export default DashboardStatContext;
