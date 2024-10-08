import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import config from "config";

const ProductCategoryContext = createContext();

export const ProductCategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [moreLoading, setMoreLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        // Fetch product categories from the backend (once)
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    `${config.API_BASE_URL}/category`
                );
                setCurrentPage(response.data.data.page);
                setHasNextPage(response.data.data.hasNextPage);
                setCategories(response.data.data.docs);
            } catch (error) {
                console.error("Error fetching product categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const addOrUpdateCategory = (newCategory) => {
        setCategories((prevCategories) => {
            const categoryExists = prevCategories.find(
                (category) => category._id === newCategory._id
            );

            if (categoryExists) {
                // Update existing product
                return prevCategories.map((category) =>
                    category._id === newCategory._id ? newCategory : category
                );
            } else {
                // Add new product
                return [...prevCategories, newCategory];
            }
        });
    };
    const loadMore = async () => {
        setMoreLoading(true);
        if (!hasNextPage) {
            return;
        }
        try {
            const response = await axios.get(
                `${config.API_BASE_URL}/category?page=${currentPage + 1}`
            );
            setHasNextPage(response.data.data.hasNextPage);
            setCategories((prevCategories) => [
                ...prevCategories,
                ...response.data.data.docs,
            ]);
        } catch (err) {
            console.log("Error fetching more categories:", err);
        } finally {
            setMoreLoading(false);
        }
    };

    return (
        <ProductCategoryContext.Provider
            value={{
                categories,
                loading,
                addOrUpdateCategory,
                loadMore,
                moreLoading,
                hasNextPage,
            }}>
            {children}
        </ProductCategoryContext.Provider>
    );
};

export default ProductCategoryContext;
