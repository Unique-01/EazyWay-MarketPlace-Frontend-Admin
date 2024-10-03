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
    const fetchPayments = useCallback(async () => {
        if (!userLoading && user && user.isAdmin) {
            try {
                const response = await apiClient.get(
                    `${config.API_BASE_URL}/product/payment/admin`
                );
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

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    return (
        <PaymentContext.Provider value={{ payments, loading, fetchPayments }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePayment = () => useContext(PaymentContext);

export default PaymentContext;
