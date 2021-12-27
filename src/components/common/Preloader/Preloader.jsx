import preloader from "../../../assets/images/preloader.svg";
import React from "react";


let Preloader = (props) => {
    return (
        <div style={ {display:'flex', justifyContent: 'center'}}> <div style={{backgroundImage:`url(${preloader})`, width:200, height:200}}  /> </div>
    );
}

export default Preloader;