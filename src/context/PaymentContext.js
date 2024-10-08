import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from "react";
import config from "config";
import { AuthContext } from "./AuthContext";
import { apiClient } from "api/apiClient";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [payments, setPayment] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: userLoading } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [moreLoading, setMoreLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);

    const fetchPayments = useCallback(async () => {
        if (!userLoading && user && user.isAdmin) {
            try {
                const response = await apiClient.get(
                    `${config.API_BASE_URL}/product/payment/admin`
                );

                setCurrentPage(response.data.data.page);
                setHasNextPage(response.data.data.hasNextPage);
                const paymentResponse = response.data.data.docs;
                const sortedPayment = [...paymentResponse].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setPayment(sortedPayment);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        }
    }, [userLoading, user]);

    const loadMore = async () => {
        setMoreLoading(true);
        if (!hasNextPage) {
            return;
        }
        try {
            const response = await apiClient.get(
                `${config.API_BASE_URL}/product/payment/admin?page=${
                    currentPage + 1
                }`
            );
            setHasNextPage(response.data.data.hasNextPage);
            setPayment((prevPayments) => [
                ...prevPayments,
                ...response.data.data.docs,
            ]);
        } catch (err) {
            console.log("Error fetching more payments:", err);
        } finally {
            setMoreLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    return (
        <PaymentContext.Provider
            value={{
                payments,
                loading,
                fetchPayments,
                loadMore,
                moreLoading,
                hasNextPage,
            }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePayment = () => useContext(PaymentContext);

export default PaymentContext;
