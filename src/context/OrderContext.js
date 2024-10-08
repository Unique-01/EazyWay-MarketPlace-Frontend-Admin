import React, { createContext, useState, useEffect, useContext } from "react";
import config from "config";
import { apiClient } from "api/apiClient";
import { AuthContext } from "./AuthContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: userLoading } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [moreLoading, setMoreLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        // Fetch product products from the backend (once)
        const fetchOrders = async () => {
            if (!userLoading) {
                if (user && user.isAdmin) {
                    try {
                        const response = await apiClient.get(
                            `${config.API_BASE_URL}/product/order/admin`
                        );
                        setCurrentPage(response.data.data.page);
                        setHasNextPage(response.data.data.hasNextPage);
                        const orderResponse = response.data.data.docs;
                        const sortedOrders = [...orderResponse].sort(
                            (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                        );
                        setOrders(sortedOrders);
                    } catch (error) {
                        console.error("Error fetching orders:", error);
                    } finally {
                        setLoading(false);
                    }
                }
            }
        };

        fetchOrders();
    }, [user, userLoading]);

    const loadMore = async () => {
        setMoreLoading(true);
        if (!hasNextPage) {
            return;
        }
        try {
            const response = await apiClient.get(
                `${config.API_BASE_URL}/product/order/admin?page=${
                    currentPage + 1
                }`
            );
            setHasNextPage(response.data.data.hasNextPage);
            setOrders((prevOrders) => [
                ...prevOrders,
                ...response.data.data.docs,
            ]);
        } catch (err) {
            console.log("Error fetching more products:", err);
        } finally {
            setMoreLoading(false);
        }
    };

    return (
        <OrderContext.Provider
            value={{ orders, loading, loadMore, moreLoading, hasNextPage }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);

export default OrderContext;
