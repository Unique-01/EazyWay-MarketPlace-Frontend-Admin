import Breadcrumb from "components/Breadcrumb";
import { Link } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { IoMdAdd } from "react-icons/io";
import CategoryForm from "components/CategoryForm";

const CategoryCreate = () => {
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
                        <button className="btn btn-primary text-white">
                            <IoMdAdd /> Add Category
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <CategoryForm />
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
