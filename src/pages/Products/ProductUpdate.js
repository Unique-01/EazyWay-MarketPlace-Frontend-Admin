import { LiaTimesSolid } from "react-icons/lia";
import { FaRegSave } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductForm from "components/ProductForm";
import { useState, useContext, useEffect } from "react";
import ButtonLoading from "components/ButtonLoading";
import axios from "axios";
import config from "config";
import HandleApiError from "components/HandleApiError";
import { apiClient } from "api/apiClient";
import ProductContext from "context/ProductContext";
import { useParams } from "react-router-dom";
import { NotificationContext } from "context/NotificationContext";
import { useNavigate } from "react-router-dom";

const ProductUpdate = () => {
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { productId } = useParams();
    const {
        products,
        loading: productLoading,
        addOrUpdateProduct,
    } = useContext(ProductContext);
    const [formData, setFormData] = useState();
    const { showNotification } = useContext(NotificationContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!productLoading) {
            const product = products.find(
                (product) => productId === product._id
            );
            setFormData({ ...product, category: product.category._id });
        }
    }, [productLoading, productId, products]);

    const isSubmitted = () => {
        setSubmit(true);
    };

    const handleSubmit = async (formData, images, videos, setFormData) => {
        setLoading(true);
        const newFormData = { ...formData };
        newFormData.image = [...formData.image.map((img) => img._id)]; // Incase user removes image present before.

        const updateImageArray = (newImages) => {
            newFormData.image = [
                ...formData.image.map((img) => img._id),
                ...(Array.isArray(newImages) ? newImages : [newImages]),
            ];
        };

        try {
            if (images.length > 0) {
                const imageData = new FormData();
                images.forEach((file) => {
                    imageData.append("intendedFile[]", file);
                });
                imageData.append("intendedFileName", "image");

                const imageResponse = await axios.post(
                    `${config.API_BASE_URL}/file`,
                    imageData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log(imageResponse.data);
                updateImageArray(imageResponse.data.data);
                console.log(newFormData);
            }
            if (videos.length > 0) {
                const videoData = new FormData();
                videos.forEach((file) => {
                    videoData.append("intendedFile", file);
                });
                videoData.append("intendedFileName", "video");

                const videoResponse = await axios.post(
                    `${config.API_BASE_URL}/file`,
                    videoData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log(videoResponse.data);
                setFormData({ ...formData, video: videoResponse.data.data });
            }

            const formResponse = await apiClient.put(
                `${config.API_BASE_URL}/product?product=${productId}`,
                newFormData
            );

            // After successful update, update the product in the context
            addOrUpdateProduct(formResponse.data.data);
            showNotification("Product Updated Successfully");
            navigate(`/merchant/products/${productId}`)

            console.log(formResponse);
        } catch (err) {
            HandleApiError(err, setError);
            console.log(err);
        } finally {
            setLoading(false);
            setSubmit(false);
        }
    };

    return (
        <div className="product-form inter py-4 mb-5">
            <div>
                <div className="d-flex justify-content-between">
                    <h5>Edit Product</h5>
                    <div className="d-inline-flex gap-3">
                        <Link
                            to="/merchant/products"
                            className="btn cancel-btn btn-light border text-secondary">
                            <LiaTimesSolid /> Cancel
                        </Link>
                        <button
                            onClick={isSubmitted}
                            disabled={loading}
                            className="btn btn-primary text-white">
                            <FaRegSave /> Save Product{" "}
                            {loading && <ButtonLoading />}
                        </button>
                    </div>
                </div>
                <ProductForm
                    onSubmit={handleSubmit}
                    isSubmitted={submit}
                    loading={loading}
                    error={error}
                    prevFormData={formData}
                    setSubmit={setSubmit}
                />
            </div>
        </div>
    );
};

export default ProductUpdate;
