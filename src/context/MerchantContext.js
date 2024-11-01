import React, { createContext, useState, useEffect, useContext } from "react";
import config from "config";
import { apiClient } from "api/apiClient";
import { AuthContext } from "./AuthContext";

const MerchantContext = createContext();

export const MerchantProvider = ({ children }) => {
    const [merchants, setMerchants] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: userLoading } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [moreLoading, setMoreLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        // Fetch product products from the backend (once)
        const fetchCustomers = async () => {
            if (!userLoading) {
                if (user && user.isAdmin) {
                    try {
                        const response = await apiClient.get(
                            `${config.API_BASE_URL}/user/manage-users?privilege=merchant`
                        );

                        setCurrentPage(response.data.data.page);
                        setHasNextPage(response.data.data.hasNextPage);
                        const merchantResponse = response.data.data.docs;
                        const sortedMerchants = [...merchantResponse].sort(
                            (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                        );
                        setMerchants(sortedMerchants);
                    } catch (error) {
                        console.error("Error fetching merchants:", error);
                    } finally {
                        setLoading(false);
                    }
                }
            }
        };

        fetchCustomers();
    }, [user, userLoading]);

    const loadMore = async () => {
        setMoreLoading(true);
        if (!hasNextPage) {
            return;
        }
        try {
            const response = await apiClient.get(
                `${
                    config.API_BASE_URL
                }/user/manage-users?privilege=merchant?page=${currentPage + 1}`
            );
            setHasNextPage(response.data.data.hasNextPage);
            setMerchants((prevMerchants) => [
                ...prevMerchants,
                ...response.data.data.docs,
            ]);
        } catch (err) {
            console.log("Error fetching more merchants:", err);
        } finally {
            setMoreLoading(false);
        }
    };

    return (
        <MerchantContext.Provider
            value={{ merchants, loading, loadMore, moreLoading, hasNextPage }}>
            {children}
        </MerchantContext.Provider>
    );
};

export const useMerchants = () => useContext(MerchantContext);

export default MerchantContext;
