const Gallery = () => {
    return(
        <div className="gallery-component">
            <div className="gallery-component-in">
                <div className="gallery-component-in-hero">
                    {/* <Image src="" alt="" /> */}
                    {/* images will be fetched from backend */}
                </div>
                <div className="gallery-component-in-main">
                    <div className="gallery-component-in-main-heading">
                        <h1>Capturing the Spirit: Moments of SVR Through the Years</h1>
                        <h4>Our gallery is a tribute to the countless memories we've created together.</h4>
                    </div>
                    <div className="gallery-component-in-main-domains">
                        <button>
                            <p>Domain Name</p>
                            {/* Domains will added from backend */}
                        </button>
                    </div>
                    <div className="gallery-component-in-images-grid">
                        {/* images grid will be coming from backend */}
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default Gallery;