import React, { useState } from 'react';

function Gallery() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [scaleX, setScaleX] = useState(1)
    const [scaleY, setScaleY] = useState(1)

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setImages([...images, url]);
    };

    const handleImageSelect = (index) => {
        setSelectedImage(images[index]);
    };

    const handleRotationChange = (event) => {
        setRotation(event.target.value);
    };

    const handleScaleXChange = (event) => {
        setScaleX(event.target.value);
    }

    const handleScaleYChange = (event) => {
        setScaleY(event.target.value);
    }

    const handleDelete = () => {
        setImages(images.filter(image => image !== selectedImage));
        setSelectedImage(null);
    }

    return (
        <div className="flex">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <div className="w-3/4">
                <div className="container object-contain aspect-[3840/896] bg-black overflow-hidden">
                    {selectedImage && (
                        <div style={{ transform: `rotate(${rotation}deg) scaleX(${scaleX}) scaleY(${scaleY})` }} className="w-full h-full">
                            <img
                                src={selectedImage}
                                alt=""
                                className="object-contain w-full h-full"
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap">
                    {images.map((src, index) => (
                        <img
                            key={src}
                            src={src}
                            alt=""
                            className="w-64 h-64 object-contain cursor-pointer"
                            onClick={() => handleImageSelect(index)}
                        />
                    ))}
                </div>
            </div>
            <div className="w-1/4 p-4">
                <input type="range" min="-360" max="360" value={rotation} onChange={handleRotationChange} /><br/>
                <h1> Rotation: </h1> <input type={"number"} onChange={handleRotationChange} className={"border-2"}/>
                <input type={"range"} min={"0"} max={"10"} step={"0.01"}  value={scaleX} onChange={handleScaleXChange}/> <br/>
                <input type={"range"} min={"0"} max={"10"} step={"0.01"} value={scaleY} onChange={handleScaleYChange}/>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default Gallery;
