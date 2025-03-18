const Hero = () => {
    return (
        <div className="hero-component">
            <div className="hero-component-header">
                <h1>Instrutions to Update Hero Image</h1>
                <p>Please follow the instructions below to update the hero image.</p>
            </div>
            <div className="hero-component-body">
               <form action="">
                <label htmlFor="">Image</label>
                <input type="text" placeholder="Enter Image Link" />
                <label htmlFor="">Image Description</label>
                <input type="text" placeholder="Enter Image Description" />
                <button type="submit">Update Hero Image</button>
               </form>
            </div>
        </div>
    );
};

export default Hero;