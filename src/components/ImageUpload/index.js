import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { LuImage } from "react-icons/lu";
import "./ImageUpload.css"; // Import the CSS file

const ImageUpload = ({
    images,
    setImages,
    defaultImages,
    removeExistingImage,
    multiple = true,
    maxFiles,
}) => {
    const { handleSubmit } = useForm();
    const inputFileRef = useRef(null);

    const onDrop = (acceptedFiles) => {
        const updatedImages = acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        setImages((prevState) => [...prevState, ...updatedImages]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/*",
        onDrop,
        multiple: multiple,
        noClick: true,
        maxFiles: maxFiles,
    });

    const handleFileSelect = (event) => {
        const files = event.target.files;
        const updatedImages = Array.from(files).map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        if (!multiple) {
            setImages(updatedImages);
        } else {
            setImages((prevState) => [...prevState, ...updatedImages]);
        }
    };

    const onSubmit = (data) => {
        console.log("Form data", data);
        console.log("Uploaded images", images);
    };

    const removeImage = (indexToRemove, event) => {
        event.stopPropagation(); // Prevent click from triggering the dropzone
        setImages((prevImages) =>
            prevImages.filter((_, index) => index !== indexToRemove)
        );
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Drag and drop area */}
                <div
                    {...getRootProps()}
                    className={`dropzone-container ${
                        isDragActive ? "dropzone-active" : ""
                    }`}>
                    <input {...getInputProps()} />

                    {/* {images.length === 0 && (
                        <div className="image-placeholder rounded-circle d-flex justify-content-center align-items-center">
                            <LuImage className="icon-style rounded" />
                        </div>
                    )} */}
                    {images.length === 0 && defaultImages.length === 0 && (
                        <div className="image-placeholder rounded-circle d-flex justify-content-center align-items-center">
                            <LuImage className="icon-style rounded" />
                        </div>
                    )}

                    {/* {images.length > 0 && ( */}
                    <div className="image-preview-container">
                        {defaultImages.map((file, index) => (
                            <div key={index} style={{ position: "relative" }}>
                                <img
                                    src={file.preview}
                                    alt="Existing Preview"
                                    className="image-preview"
                                />
                                <button
                                    type="button"
                                    onClick={(event) =>
                                        removeExistingImage(
                                            index,
                                            file.id,
                                            event
                                        )
                                    }
                                    className="remove-btn">
                                    &times;
                                </button>
                            </div>
                        ))}
                        {images.map((file, index) => (
                            <div key={index} style={{ position: "relative" }}>
                                <img
                                    src={file.preview}
                                    alt="Preview"
                                    className="image-preview"
                                />
                                {/* Remove button */}
                                <button
                                    type="button"
                                    onClick={(event) =>
                                        removeImage(index, event)
                                    }
                                    className="remove-btn">
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    {/* )} */}

                    {/* Button to trigger file input */}
                    <p className="drag-text">
                        Drag & drop some images here, or use the button below to
                        select images
                    </p>
                    <button
                        type="button"
                        onClick={() => inputFileRef.current.click()}
                        className="add-btn">
                        Add Image
                    </button>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={inputFileRef}
                        style={{ display: "none" }}
                        onChange={handleFileSelect}
                        multiple={multiple}
                        accept="image/*"
                    />
                </div>
            </form>
        </div>
    );
};

export default ImageUpload;
