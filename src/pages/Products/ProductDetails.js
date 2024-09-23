import { LiaTimesSolid } from "react-icons/lia";
import { Link, useParams } from "react-router-dom";
import ProductForm from "components/ProductForm";
import { GrEdit } from "react-icons/gr";
import { useContext, useEffect, useState } from "react";
import ProductContext from "context/ProductContext";

const ProductDetails = () => {
    const disabled = true;
    const { productId } = useParams();
    const { products, loading } = useContext(ProductContext);
    const [formData, setFormData] = useState();

    useEffect(() => {
        if (!loading) {
            const product = products.find(
                (product) => productId === product._id
            );
            setFormData({ ...product, category: product.category._id });
        }
    }, [loading, productId, products]);

    useEffect(() => {
        console.log(formData);
    },[formData]);
    return (
        <div className="product-form inter py-4 mb-5">
            <div>
                <div className="d-flex justify-content-between">
                    <h5>Product Details</h5>
                    <div className="d-inline-flex gap-3">
                        <Link
                            to="/products"
                            className="btn cancel-btn btn-light border text-secondary">
                            <LiaTimesSolid /> Cancel
                        </Link>
                        <Link to="edit" className="btn btn-primary text-white">
                            <GrEdit /> Edit Product
                        </Link>
                    </div>
                </div>
                <ProductForm loading={disabled} prevFormData={formData} />
            </div>
        </div>
    );
};

export default ProductDetails;
