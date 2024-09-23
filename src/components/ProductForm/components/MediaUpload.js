import React from "react";
import ImageUpload from "components/ImageUpload";
import VideoUpload from "components/VideoUpload";

const MediaUpload = ({ images, setImages, videos, setVideos, loading,defaultImages,removeExistingImage }) => (
    <div className="bg-white shadow-sm p-4 rounded mb-4">
        <h6 className="mb-3">Media</h6>
        <div className="mb-3">
            <label className="form-label">Photo</label>
            <ImageUpload images={images} setImages={setImages} defaultImages={defaultImages} removeExistingImage={removeExistingImage} />
        </div>
        <div>
            <label className="form-label">Video</label>
            <VideoUpload videos={videos} setVideos={setVideos} />
        </div>
    </div>
);

export default MediaUpload;
