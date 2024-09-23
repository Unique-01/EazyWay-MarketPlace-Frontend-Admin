import { LiaTimesSolid } from "react-icons/lia";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import ProductForm from "components/ProductForm";
import { useContext, useState } from "react";
import ButtonLoading from "components/ButtonLoading";
import axios from "axios";
import config from "config";
import HandleApiError from "components/HandleApiError";
import { apiClient } from "api/apiClient";
import ProductContext from "context/ProductContext";
import { NotificationContext } from "context/NotificationContext";
import Breadcrumb from "components/Breadcrumb";

const ProductCreate = () => {
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { addOrUpdateProduct } = useContext(ProductContext);
    const { showNotification } = useContext(NotificationContext);
    const navigate = useNavigate();

    const isSubmitted = () => {
        setSubmit(true);
    };

    const handleSubmit = async (formData, images, videos, setFormData) => {
        setLoading(true);

        const updateImageArray = (newImages) => {
            setFormData((prevState) => ({
                ...prevState,
                image: newImages,
            }));
        };

        try {
            if (images) {
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
                console.log(imageResponse.data.data);
                updateImageArray(imageResponse.data.data);
            }
            if (videos) {
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

            const formResponse = await apiClient.post(
                `${config.API_BASE_URL}/product`,
                formData
            );

            addOrUpdateProduct(formResponse.data.data);
            navigate("/merchant/products");
            showNotification("Product Added Successfully");

            console.log(formResponse);
        } catch (err) {
            HandleApiError(err, setError);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="product-form inter py-4 mb-5">
            <div>
                <div className="d-flex justify-content-between align-items-end">
                    <div>
                        <h5>Add Product</h5>
                        <Breadcrumb />
                    </div>
                    <div className="d-inline-flex gap-3">
                        <Link
                            to="/products"
                            className="btn cancel-btn btn-light border text-secondary">
                            <LiaTimesSolid /> Cancel
                        </Link>
                        <button
                            onClick={isSubmitted}
                            disabled={loading}
                            className="btn btn-primary text-white">
                            <IoMdAdd /> Add Product{" "}
                            {loading && <ButtonLoading />}
                        </button>
                    </div>
                </div>
                <ProductForm
                    onSubmit={handleSubmit}
                    isSubmitted={submit}
                    loading={loading}
                    error={error}
                    setSubmit={setSubmit}
                />
            </div>
        </div>
    );
};

export default ProductCreate;
