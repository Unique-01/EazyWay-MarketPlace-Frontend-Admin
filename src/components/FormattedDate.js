import React from "react";

const FormattedDate = ({ date }) => {
    // Convert the date string to a Date object and format it
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return <span>{formattedDate}</span>;
};

export default FormattedDate;
