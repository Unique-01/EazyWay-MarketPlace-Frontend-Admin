import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import config from "config";

const ProductCategoryContext = createContext();

export const ProductCategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch product categories from the backend (once)
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    `${config.API_BASE_URL}/category`
                );
                setCategories(response.data.data.docs);
            } catch (error) {
                console.error("Error fetching product categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <ProductCategoryContext.Provider value={{ categories, loading }}>
            {children}
        </ProductCategoryContext.Provider>
    );
};

export default ProductCategoryContext;
