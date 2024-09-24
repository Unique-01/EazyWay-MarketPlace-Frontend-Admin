import Breadcrumb from "components/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { GrEdit } from "react-icons/gr";
import CategoryForm from "components/CategoryForm";
import { useContext, useEffect, useState } from "react";
import ProductCategoryContext from "context/ProductCategoryContext";

const CategoryDetails = () => {
    const disabled = true;
    const { categoryId } = useParams();
    const { categories, loading: categoryLoading } = useContext(
        ProductCategoryContext
    );
    const [initialFormData, setInitialFormData] = useState();

    useEffect(() => {
        if (!categoryLoading) {
            const category = categories.find(
                (category) => category._id === categoryId
            );
            setInitialFormData(category);
        }
    }, [categoryLoading, categories, categoryId]);

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
                        <Link to="edit" className="btn btn-primary text-white">
                            <GrEdit /> Edit Category
                        </Link>
                    </div>
                </div>
                <div className="mt-4">
                    <CategoryForm
                        loading={disabled}
                        initialFormData={initialFormData}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryDetails;
