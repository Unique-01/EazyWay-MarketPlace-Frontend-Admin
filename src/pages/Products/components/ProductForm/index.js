import React, { useCallback, useContext, useEffect, useState } from "react";
import ProductCategoryContext from "context/ProductCategoryContext";
import GeneralInformation from "./components/GeneralInformation";
import MediaUpload from "./components/MediaUpload";
import Pricing from "./components/Pricing";
import Inventory from "./components/Inventory";
import VariationForm from "pages/Products/components/ProductForm/components/VariationForm";
import Shipping from "./components/Shipping";
import CategorySelect from "./components/CategorySelect";
import StatusSelect from "./components/StatusSelect";
import TagsInputField from "./components/TagsInputField";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique ids

// const ProductForm = ({
//     onSubmit,
//     isSubmitted,
//     loading,
//     error,
//     prevFormData,
//     setSubmit,
// }) => {
//     const { categories, loading: categoryLoading } = useContext(
//         ProductCategoryContext
//     );
//     const [images, setImages] = useState([]);
//     const [videos, setVideos] = useState([]);
//     const [defaultImages, setDefaultImages] = useState([]);
//     const [formData, setFormData] = useState({
//         title: "",
//         amount: "",
//         category: "",
//         quantity: "",
//         tags: [],
//         discount: "",
//         description: "",
//         image: [],
//         video: "",
//         measurement: {
//             height: "",
//             width: "",
//             length: "",
//             weight: "",
//         },
//         sku: "",
//         barcode: "",
//         availType: "",
//         variations: [],
//     });

//     useEffect(() => {
//         if (prevFormData) {
//             // setFormData(prevFormData);
//             setFormData({
//                 ...prevFormData,
//                 // Map variations and assign an ID to each one if they don't have an id
//                 variations: prevFormData.variations.map((variation) => ({
//                     ...variation,
//                     id: uuidv4(), // Assign a unique id to each variation
//                 })),
//             });
            
//             // Map the default images (existing images from the server)
//             const existingImages = prevFormData.image.map((image) => ({
//                 preview: image.url, // assuming your image URLs are here
//                 id: image._id, // any identifier to keep track of the image for removal
//             }));
//             setDefaultImages(existingImages);
//         }
//     }, [prevFormData]);

//     const removeExistingImage = (indexToRemove, event) => {
//         setDefaultImages((prevImages) =>
//             prevImages.filter((_, index) => index !== indexToRemove)
//         );

//         setFormData((prevState) => ({
//             ...prevState,
//             // Exclude the removed image from the formData's image array
//             image: prevState.image.filter(
//                 (_, index) => index !== indexToRemove
//             ),
//         }));
//     };

//     useEffect(() => {
//         if (isSubmitted) {
//             const cleanFormData = {
//                 ...formData,
//                 variations: formData.variations.map(({ id, ...rest }) => rest),
//             };
//             // Call the onSubmit function with cleaned data
//             onSubmit(cleanFormData, images, videos, setFormData);
//             // onSubmit(formData, images, videos, setFormData);

//             setSubmit(false);
//         }
//     }, [isSubmitted, onSubmit, formData, images, videos, setSubmit]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;

//         if (["height", "width", "length", "weight"].includes(name)) {
//             setFormData((prevData) => ({
//                 ...prevData,
//                 measurement: {
//                     ...prevData.measurement,
//                     [name]: value,
//                 },
//             }));
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     const handleVariationsChange = (newVariations) => {
//         setFormData({
//             ...formData,
//             variations: newVariations,
//         });
//     };

//     const handleTagsChange = (newTags) => {
//         setFormData((prevState) => ({
//             ...prevState,
//             tags: newTags,
//         }));
//     };

//     return (
//         <div>
//             <div className="row mt-4">
//                 <div className="col-lg-8">
//                     <form>
//                         {error && <p className="text-danger">{error}</p>}
//                         <GeneralInformation
//                             formData={formData}
//                             handleInputChange={handleInputChange}
//                             loading={loading}
//                         />
//                         <MediaUpload
//                             images={images}
//                             setImages={setImages}
//                             videos={videos}
//                             setVideos={setVideos}
//                             removeExistingImage={removeExistingImage}
//                             defaultImages={defaultImages}
//                         />
//                         <Pricing
//                             formData={formData}
//                             handleInputChange={handleInputChange}
//                             loading={loading}
//                         />
//                         <Inventory
//                             formData={formData}
//                             handleInputChange={handleInputChange}
//                             loading={loading}
//                         />
//                         <div className=" bg-white shadow-sm p-4 rounded mb-4">
//                             <h6 className="mb-3">Variation</h6>
//                             <VariationForm
//                                 onChange={handleVariationsChange}
//                                 variations={formData.variations}
//                                 loading={loading}
//                             />
//                         </div>
//                         <Shipping
//                             formData={formData}
//                             handleInputChange={handleInputChange}
//                             loading={loading}
//                         />
//                     </form>
//                 </div>
//                 <div className="col-lg-4">
//                     <div className="bg-white shadow-sm p-4 rounded mb-4">
//                         <h6 className="mb-3">Category</h6>
//                         <CategorySelect
//                             categories={categoryLoading ? [] : categories}
//                             selectedCategory={formData.category}
//                             handleChange={handleInputChange}
//                             loading={loading}
//                         />
//                         <TagsInputField
//                             tags={formData.tags}
//                             handleTagsChange={handleTagsChange}
//                             loading={loading}
//                         />
//                     </div>
//                     <div className="bg-white shadow-sm p-4 rounded mb-4">
//                         <div>
//                             <h6>Status</h6>
//                         </div>
//                         <StatusSelect
//                             selectedStatus={formData.availType}
//                             handleChange={handleInputChange}
//                             loading={loading}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductForm;


const validationRules = {
    title: {
        required: true,
        minLength: 5,
        maxLength: 100,
    },
    amount: {
        required: true,
        pattern: /^\d+(\.\d{2})?$/,
    },
    category: {
        required: true,
    },
    quantity: {
        required: true,
        pattern: /^\d+$/,
    },
    description: {
        required: true,
        minLength: 20,
    },
    sku: {
        required: true,
    },
    barcode: {
        required: true,
    },
};
const ProductForm = ({
    onSubmit,
    isSubmitted,
    loading,
    error,
    prevFormData,
    setSubmit,
}) => {
    const { categories, loading: categoryLoading } = useContext(
        ProductCategoryContext
    );
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [defaultImages, setDefaultImages] = useState([]);
    const [errors, setErrors] = useState({
        title: "",
        amount: "",
        category: "",
        quantity: "",
        description: "",
        sku: "",
        barcode: "",
    });

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        quantity: "",
        tags: [],
        discount: "",
        description: "",
        image: [],
        video: "",
        measurement: {
            height: "",
            width: "",
            length: "",
            weight: "",
        },
        sku: "",
        barcode: "",
        availType: "draft",
        variations: [],
    });

    useEffect(() => {
        if (prevFormData) {
            // setFormData(prevFormData);
            setFormData({
                ...prevFormData,
                // Map variations and assign an ID to each one if they don't have an id
                variations: prevFormData.variations.map((variation) => ({
                    ...variation,
                    id: uuidv4(), // Assign a unique id to each variation
                })),
            });
            // Map the default images (existing images from the server)
            const existingImages = prevFormData.image.map((image) => ({
                preview: image.url, // assuming your image URLs are here
                id: image._id, // any identifier to keep track of the image for removal
            }));
            setDefaultImages(existingImages);
        }
    }, [prevFormData]);

    const removeExistingImage = (indexToRemove, event) => {
        setDefaultImages((prevImages) =>
            prevImages.filter((_, index) => index !== indexToRemove)
        );

        setFormData((prevState) => ({
            ...prevState,
            // Exclude the removed image from the formData's image array
            image: prevState.image.filter(
                (_, index) => index !== indexToRemove
            ),
        }));
    };

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
            } else if (rule.pattern && value && !rule.pattern.test(value)) {
                errors[fieldName] = "Invalid format.";
            }
        }

        setErrors(errors);
        // setErrors((prevErrors) => ({ ...prevErrors, ...errors }));
        return Object.keys(errors).length === 0; // Return true if no errors
    }, []);
    useEffect(() => {
        if (isSubmitted) {
            const isFormValid = validateForm(formData);
            if (isFormValid) {
                const cleanFormData = {
                    ...formData,
                    variations: formData.variations.map(
                        ({ id, ...rest }) => rest
                    ),
                };
                // Call the onSubmit function with cleaned data
                onSubmit(cleanFormData, images, videos, setFormData);
            }
            setSubmit(false);

            // onSubmit(formData, images, videos, setFormData);
        }
    }, [
        isSubmitted,
        onSubmit,
        formData,
        images,
        videos,
        setSubmit,
        validateForm,
    ]);

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

        if (["height", "width", "length", "weight"].includes(name)) {
            setFormData((prevData) => ({
                ...prevData,
                measurement: {
                    ...prevData.measurement,
                    [name]: value,
                },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleVariationsChange = (newVariations) => {
        setFormData({
            ...formData,
            variations: newVariations,
        });
    };

    const handleTagsChange = (newTags) => {
        setFormData((prevState) => ({
            ...prevState,
            tags: newTags,
        }));
    };

    return (
        <div>
            <div className="row mt-4">
                <div className="col-lg-8">
                    <form>
                        {error && <p className="text-danger">{error}</p>}
                        <GeneralInformation
                            formData={formData}
                            handleInputChange={handleInputChange}
                            loading={loading}
                            errors={errors}
                        />
                        <MediaUpload
                            images={images}
                            setImages={setImages}
                            videos={videos}
                            setVideos={setVideos}
                            removeExistingImage={removeExistingImage}
                            defaultImages={defaultImages}
                        />
                        <Pricing
                            formData={formData}
                            handleInputChange={handleInputChange}
                            loading={loading}
                            errors={errors}
                        />
                        <Inventory
                            formData={formData}
                            handleInputChange={handleInputChange}
                            loading={loading}
                            errors={errors}
                        />
                        <div className=" bg-white shadow-sm p-4 rounded mb-4">
                            <h6 className="mb-3">Variation</h6>
                            <VariationForm
                                onChange={handleVariationsChange}
                                variations={formData.variations}
                                loading={loading}
                            />
                        </div>
                        <Shipping
                            formData={formData}
                            handleInputChange={handleInputChange}
                            loading={loading}
                        />
                    </form>
                </div>
                <div className="col-lg-4">
                    <div className="bg-white shadow-sm p-4 rounded mb-4">
                        <h6 className="mb-3">Category</h6>
                        <CategorySelect
                            categories={categoryLoading ? [] : categories}
                            selectedCategory={formData.category}
                            handleChange={handleInputChange}
                            loading={loading}
                            errors={errors}
                        />
                        <TagsInputField
                            tags={formData.tags}
                            handleTagsChange={handleTagsChange}
                            loading={loading}
                        />
                    </div>
                    <div className="bg-white shadow-sm p-4 rounded mb-4">
                        <div>
                            <h6>Status</h6>
                        </div>
                        <StatusSelect
                            selectedStatus={formData.availType}
                            handleChange={handleInputChange}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
