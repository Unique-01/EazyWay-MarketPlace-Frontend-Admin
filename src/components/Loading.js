const Loading = () => {
    return (
        <div style={{ width: "100%", height: "50vh" }}>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div
                    className="spinner-grow text-primary"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Loading;
