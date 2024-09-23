const HandleApiError = (error, setError) => {
    if (error.response && error.response.data && error.response.data.error) {
        const errors = error.response.data.error;
        if (Array.isArray(errors)) {
            const errorMessages = errors.map((err) => err.message).join(", ");
            setError(errorMessages);
        } else {
            setError("An unknown error occurred.");
        }
    } else {
        setError("Something went wrong. Please try again later.");
    }
};

export default HandleApiError;
