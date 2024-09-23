import React, { createContext, useState, useEffect, useContext } from "react";
import config from "config";
import { apiClient } from "api/apiClient";
import { AuthContext } from "./AuthContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: userLoading } = useContext(AuthContext);

    useEffect(() => {
        // Fetch product products from the backend (once)
        const fetchProducts = async () => {
            if (!userLoading) {
                if (user && user.privilege === "admin") {
                    try {
                        const response = await apiClient.get(
                            `${config.API_BASE_URL}/product`
                        );
                        setProducts(response.data.data.docs);
                    } catch (error) {
                        console.error(
                            "Error fetching product products:",
                            error
                        );
                    } finally {
                        setLoading(false);
                    }
                }
            }
        };

        fetchProducts();
    }, [user, userLoading]);

    // Function to add or update a product in the list
    const addOrUpdateProduct = (newProduct) => {
        setProducts((prevProducts) => {
            const productExists = prevProducts.find(
                (product) => product._id === newProduct._id
            );

            if (productExists) {
                // Update existing product
                return prevProducts.map((product) =>
                    product._id === newProduct._id ? newProduct : product
                );
            } else {
                // Add new product
                return [...prevProducts, newProduct];
            }
        });
    };

    return (
        <ProductContext.Provider
            value={{ products, loading, setProducts, addOrUpdateProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
