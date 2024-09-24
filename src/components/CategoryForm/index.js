import ImageUpload from "components/ImageUpload";
import "./CategoryForm.css";
import { useEffect, useState } from "react";

const CategoryForm = ({
    onSubmit,
    isSubmitted,
    loading,
    error,
    setIsSubmitted,
    initialFormData,
}) => {
    const [image, setImage] = useState([]);
    const [defaultImage, setDefaultImage] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        if (initialFormData) {
            setFormData(initialFormData);
            if (initialFormData.image) {
                setDefaultImage(
                    [initialFormData.image].map((image) => ({
                        preview: image.url,
                        id: image._id,
                    }))
                );
            }
        }
    }, [initialFormData]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (isSubmitted) {
            const newFormData = new FormData();
            newFormData.append("title", formData.title);
            newFormData.append("description", formData.description);
            newFormData.append("intendedFileName", "image");
            image.forEach((file) => {
                newFormData.append("intendedFile", file);
            });

            onSubmit(newFormData);
            setIsSubmitted(false);
        }
    }, [isSubmitted, formData, onSubmit, image, setIsSubmitted]);

    const removeExistingImage = (indexToRemove, event) => {
        setDefaultImage((prevImages) =>
            prevImages.filter((_, index) => index !== indexToRemove)
        );

        setFormData((prevState) => ({
            ...prevState,
            // Exclude the removed image from the formData's image array
            image: "",
        }));
    };

    return (
        <div className=" category-form row">
            {error && <p className="text-danger">{error}</p>}
            <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-body">
                        <h6 className="mb-3">Thumbnail</h6>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">
                                Photo
                            </label>
                            <div>
                                <ImageUpload
                                    images={image}
                                    setImages={setImage}
                                    multiple={false}
                                    defaultImages={defaultImage}
                                    removeExistingImage={removeExistingImage}
                                    setDefaultImages={setDefaultImage}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="bg-white shadow-sm p-4 rounded mb-4">
                    <h6 className="mb-3">General Information</h6>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">
                            Category Name
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            id="categoryName"
                            type="text"
                            className="form-control"
                            placeholder="Type category name here . . ."
                            onChange={handleInputChange}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="form-label">Description</label>
                        <textarea
                            placeholder="Type product description here . . ."
                            rows={5}
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            disabled={loading}></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;
