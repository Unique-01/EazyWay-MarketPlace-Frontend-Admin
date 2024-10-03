import { LiaTimesSolid } from "react-icons/lia";
import { Link, useParams } from "react-router-dom";
import ProductForm from "pages/Products/components/ProductForm";
import { GrEdit } from "react-icons/gr";
import { useContext, useEffect, useState } from "react";
import ProductContext from "context/ProductContext";
import { apiClient } from "api/apiClient";
import config from "config";
import HandleApiError from "components/HandleApiError";
import ButtonLoading from "components/ButtonLoading";
import { NotificationContext } from "context/NotificationContext";

const ProductDetails = () => {
    const disabled = true;
    const { productId } = useParams();
    const { products, loading, addOrUpdateProduct } =
        useContext(ProductContext);
    const [formData, setFormData] = useState();
    const [publishLoading, setPublishLoading] = useState(false);
    const { showNotification } = useContext(NotificationContext);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!loading) {
            const product = products.find(
                (product) => productId === product._id
            );
            setFormData({ ...product, category: product.category._id });
        }
    }, [loading, productId, products]);

    // useEffect(() => {
    //     console.log(formData);
    // }, [formData]);

    const publishProduct = async () => {
        setPublishLoading(true);
        try {
            const response = await apiClient.put(
                `${config.API_BASE_URL}/product/status-update-admin?product=${productId}`,
                {
                    availType: "published",
                }
            );
            showNotification("Product published successfully");
            addOrUpdateProduct(response.data.data);
            // console.log(response);
        } catch (err) {
            HandleApiError(err, setError);
        } finally {
            setPublishLoading(false);
        }
    };

    return (
        <div className="product-form inter py-4 mb-5">
            <div>
                <div className="d-flex justify-content-between">
                    <h5>Product Details</h5>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="d-inline-flex gap-3">
                        <Link
                            to="/products"
                            className="btn cancel-btn btn-light border text-secondary">
                            <LiaTimesSolid /> Cancel
                        </Link>
                        {!loading &&
                        formData &&
                        formData.availType !== "published" ? (
                            <button
                                onClick={publishProduct}
                                disabled={publishLoading}
                                className="btn btn-success ">
                                Publish Product
                                {publishLoading && <ButtonLoading />}
                            </button>
                        ) : (
                            ""
                        )}
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
