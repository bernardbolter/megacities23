const Loader = ({ loaderText }) => {
    return (
        <div className="loader">
            <img src={"/images/globe.gif"} alt="spinning globe loader" />
            <p>Loading {loaderText}.....</p>
        </div>
    )
}

export default Loader