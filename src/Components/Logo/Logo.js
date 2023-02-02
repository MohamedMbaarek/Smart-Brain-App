import React from "react";
import brain from "./brain.png";
import Tilt from "react-parallax-tilt";
import "./Logo.css";

const Logo = () => {
    return (
        <div className="ma5 mt0">
            <Tilt className="Tilt br2 shadow-2">
                <div  className="inner pa4">
                    <img src={brain} alt="logo"/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;