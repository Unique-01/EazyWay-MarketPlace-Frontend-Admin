import React from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const TagsInputField = ({ tags, handleTagsChange, loading }) => (
    <div>
        <label className="form-label">Product Tags</label>
        <TagsInput
            value={tags}
            onChange={handleTagsChange}
            inputProps={{ placeholder: "Add a tag" }}
            disabled={loading}
        />
    </div>
);

export default TagsInputField;
