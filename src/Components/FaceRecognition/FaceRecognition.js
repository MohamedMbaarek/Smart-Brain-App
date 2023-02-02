import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
    if (imageUrl){
        return(
            <div className="center">
                <div className="absolute mt2">
                    <img id='inputimage' src={imageUrl} alt="Detector" width='500px' heigh='auto'/>
                    <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                </div>
            </div>
        )
    } 
}

export default FaceRecognition;