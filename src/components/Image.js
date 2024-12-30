import React, { useState } from "react";
import axios from "axios";

function Image(name){
 const [link,setLink] = useState("");
 const handleName = async function(){
    try{
      const res = await axios.get('http://localhost:5000/getLink',
        {params:name}
      );
      console.log("received res",res);
    }
    catch(error){
      console.log("error ",error);
    }
 }
 handleName();
 return(
    <div className="Image">
        <img
        src={link}
        alt="Fighter Name"
      />
    </div>
 )
}
export default Image