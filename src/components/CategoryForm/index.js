import ImageUpload from "components/ImageUpload";
import "./CategoryForm.css";
import { useCallback, useEffect, useState } from "react";

const validationRules = {
    title: {
        required: true,
        minLength: 5,
        maxLength: 100,
    },
    description: {
        required: true,
        minLength: 20,
    },
};

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
    const [errors, setErrors] = useState({
        title: "",
        description: "",
    });
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

    const validateForm = useCallback((formData) => {
        if (!formData) {
            return {};
        }
        const errors = {}; // Initialize an empty errors object

        for (const fieldName in validationRules) {
            const rule = validationRules[fieldName];
            const value = formData[fieldName];

            if (rule.required && !value) {
                errors[fieldName] = "This field is required.";
            } else if (
                rule.minLength &&
                value &&
                value.length < rule.minLength
            ) {
                errors[
                    fieldName
                ] = `Minimum length is ${rule.minLength} characters.`;
            }
        }

        setErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = "";
        const validationRule = validationRules[name];

        if (validationRule) {
            if (validationRule.required && !value) {
                errorMessage = "This field is required.";
            } else if (
                validationRule.minLength &&
                value.length < validationRule.minLength
            ) {
                errorMessage = `Minimum length is ${validationRule.minLength} characters.`;
            } else if (
                validationRule.pattern &&
                !validationRule.pattern.test(value)
            ) {
                errorMessage = "Invalid format.";
            } else {
                errorMessage = undefined;
            }
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (isSubmitted) {
            const isFormValid = validateForm(formData);
            if (isFormValid) {
                const newFormData = new FormData();
                newFormData.append("title", formData.title);
                newFormData.append("description", formData.description);
                newFormData.append("intendedFileName", "image");
                image.forEach((file) => {
                    newFormData.append("intendedFile", file);
                });

                onSubmit(newFormData);
            }
            setIsSubmitted(false);
        }
    }, [isSubmitted, formData, onSubmit, image, setIsSubmitted, validateForm]);

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
                            className={`form-control ${
                                errors?.title && "border-danger"
                            }`}
                            placeholder="Type category name here . . ."
                            onChange={handleInputChange}
                            disabled={loading}
                        />
                        {errors?.title && (
                            <p className="text-danger small">{errors.title}</p>
                        )}
                    </div>
                    <div>
                        <label className="form-label">Description</label>
                        <textarea
                            placeholder="Type product description here . . ."
                            rows={5}
                            className={`form-control ${
                                errors?.description && "border-danger"
                            }`}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            disabled={loading}></textarea>
                        {errors?.description && (
                            <p className="text-danger small">
                                {errors.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;
