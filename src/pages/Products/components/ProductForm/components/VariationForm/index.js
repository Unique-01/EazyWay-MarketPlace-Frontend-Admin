import React, { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { IoMdAdd } from "react-icons/io";

function VariationForm({ onChange, variations, loading }) {
    const [sections, setSections] = useState(
        variations || [{ id: 1, variation: "", value: "" }]
    );

    // Set sections when the variations prop changes
    useEffect(() => {
        if (variations && variations.length > 0) {
            setSections(variations);
        }
    }, [variations]);

    // Function to add a new section
    const addSection = () => {
        setSections([
            ...sections,
            { id: sections.length + 1, variation: "", value: "" },
        ]);
    };

    // Function to remove a section
    const removeSection = (id) => {
        setSections((prevSections) => {
            const updatedSections = prevSections.filter(
                (section) => section.id !== id
            );
            onChange(updatedSections); // Notify parent component
            return updatedSections;
        });
    };

    // Function to handle input changes
    const handleInputChange = (index, event) => {
        const newSections = [...sections];
        newSections[index][event.target.name] = event.target.value;
        setSections(newSections);
        onChange(newSections); // Notify parent component about the change
    };

    return (
        <div>
            {sections.map((section, index) => (
                <div key={section.id} className="row align-items-end mb-3">
                    <div className="col-md-5">
                        <label className="form-label">Variation</label>
                        <input
                            type="text"
                            name="variation"
                            value={section.variation} // Set default value
                            className="form-control"
                            placeholder="Variation . . ."
                            disabled={loading}
                            onChange={(event) =>
                                handleInputChange(index, event)
                            }
                        />
                    </div>

                    <div className="col-md-5">
                        <label className="form-label">Value</label>
                        <input
                            type="text"
                            name="value"
                            value={section.value} // Set default value
                            className="form-control"
                            placeholder="Value . . ."
                            disabled={loading}
                            onChange={(event) =>
                                handleInputChange(index, event)
                            }
                        />
                    </div>

                    {sections.length > 1 && (
                        <div className="col-md-2">
                            <button
                                type="button"
                                className="btn p-2 btn-light"
                                disabled={loading}
                                style={{
                                    backgroundColor: "#FCDAD7",
                                    color: "#F04438",
                                }}
                                onClick={() => removeSection(section.id)}>
                                <LiaTimesSolid />
                            </button>
                        </div>
                    )}
                </div>
            ))}
            <button
                className="btn"
                style={{
                    backgroundColor: "#BFECC180",
                    color: "#00B207",
                    fontWeight: "600",
                }}
                type="button"
                onClick={addSection}
                disabled={loading}>
                <IoMdAdd style={{ fontSize: "20px" }} /> Add Variant
            </button>
        </div>
    );
}

export default VariationForm;
