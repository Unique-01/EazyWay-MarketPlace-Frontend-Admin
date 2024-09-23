import ImageUpload from "components/ImageUpload";
import "./CategoryForm.css";
import { useState } from "react";

const CategoryForm = () => {
    const [image, setImage] = useState([]);
    const [defaultImage, setDefaultImage] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        intendedFileName: "image",
        intendedFile: null,
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div className=" category-form row">
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
                            // disabled={loading}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;
