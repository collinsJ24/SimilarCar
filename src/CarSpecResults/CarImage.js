import React, { useState, useEffect } from 'react';
import './CarImage.css';

const CarImage = (props) => {
    console.log(props.imageLink);
    const [images, setImages] = useState([]);
    const[ isImageSet, setImageSet] = useState(false);

    const fetchImageUrl = async () => {
        return await fetch(props.imageLink)
          .then((response) => {
            return response.json();
          })
          .then((imageData) => {
            const transformedImages = imageData.images.map((image) => {
              return {
                imageLink: image.link
              };
            });
            setImages(transformedImages);
            console.log(transformedImages);
            setImageSet(true);
            props.onImageReadyToDisplay();
          });
      }

      useEffect( () => {fetchImageUrl()},[]);
    return (
        <div className="CarImage">
        {isImageSet && 
        <img className="CarImage" src= {images[0].imageLink} alt="defult_image" ></img>
        }
        </div>
    );

}

export default CarImage;