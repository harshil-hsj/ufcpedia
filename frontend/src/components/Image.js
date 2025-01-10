import React, { useEffect, useState } from "react";
import axios from "axios";
import './Image.css';
import { baseUrl } from "../Url";

function Image({name}){
 const [link,setLink] = useState("");
 useEffect(()=>{
 const handleName = async ()=>{

    try{
      const res = await axios.get(`${baseUrl}/getLink`,
        {params:{name},}
      );
      console.log("zero");
      setLink(res.data.link);
      console.log("received res",res.data);
    }
    catch(error){
      console.log("error ",error);
    }
  };
 if(name){
  handleName();
 }},[name]);

 return(
    <div className="Image">
      { link && 
        <img
        src={link}
        alt="Fighter Name" 
      />
      }
    </div>
 )
}
export default Image