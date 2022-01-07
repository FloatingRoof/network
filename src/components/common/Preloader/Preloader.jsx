import preloader from "../../../assets/images/preloader.svg";
import React from "react";


let Preloader = ({w =200, h =200}) => {

    return (
        <div style={ {display:'flex', justifyContent: 'center'}}> <div style={{backgroundSize: "contain", backgroundImage:`url(${preloader})`, width:w, height:h}}  /> </div>
    );
}

export default Preloader;