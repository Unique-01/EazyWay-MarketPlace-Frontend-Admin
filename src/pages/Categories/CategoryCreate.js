import Breadcrumb from "components/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { IoMdAdd } from "react-icons/io";
import CategoryForm from "components/CategoryForm";
import { useContext, useState } from "react";
import { apiClient } from "api/apiClient";
import config from "config";
import HandleApiError from "components/HandleApiError";
import ProductCategoryContext from "context/ProductCategoryContext";
import { NotificationContext } from "context/NotificationContext";
import ButtonLoading from "components/ButtonLoading";

const CategoryCreate = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { addOrUpdateCategory } = useContext(ProductCategoryContext);
    const navigate = useNavigate();
    const { showNotification } = useContext(NotificationContext);

    const handleSubmit = async (formData) => {
        setLoading(true);
        try {
            const response = await apiClient.post(
                `${config.API_BASE_URL}/category`,
                formData
            );
            console.log(formData);
            console.log(response.data.data);
            addOrUpdateCategory(response.data.data);
            navigate("/categories");
            showNotification("Category Added Successfully");
        } catch (err) {
            HandleApiError(err, setError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="merchant-product-list py-4 mb-5 inter">
            <div>
                <div className="d-flex justify-content-between align-items-end">
                    <div>
                        <h5>Categories</h5>
                        <Breadcrumb />
                    </div>
                    <div className="d-inline-flex gap-3">
                        <Link
                            to="/categories"
                            className="btn cancel-btn btn-light border text-secondary">
                            <LiaTimesSolid /> Cancel
                        </Link>
                        <button
                            onClick={() => setIsSubmitted(true)}
                            disabled={loading}
                            className="btn btn-primary text-white">
                            <IoMdAdd /> Add Category{" "}
                            {loading && <ButtonLoading />}
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <CategoryForm
                        isSubmitted={isSubmitted}
                        onSubmit={handleSubmit}
                        setIsSubmitted={setIsSubmitted}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
