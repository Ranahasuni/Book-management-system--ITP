import React, { useEffect, useState } from 'react'
import Nav from "../Nav/Nav";
import axios from 'axios';
import './ImgUploader.css';

function ImgUploader() {
    const [image,setImage]=useState(null);
    const[allImage,setAllImage] = useState(null);

    const submitImg =async (e)=>{
        e.preventDefault();

    const formData = new FormData();
    formData.append("image",image);

    const result = await axios.post(
        "http://localhost:5000/uploadImg",
        formData,{
            headers:{"Content-Type":"multipart/form-data"},

            }
    );
    console.log("Upload result:", result.data);
    getImage();
};

const onImgChange =(e)=>{
    setImage(e.target.files[0]);
};
const getImage =async(e)=>{
    try{
        const result =await axios.get("http://localhost:5000/getImage");
        setAllImage(result.data.data);
    }catch(e){
        console.error("Error getting image",e);

    }
};
useEffect(()=>{
    getImage();
},[]);
  return (
    <div>
        <Nav/>
      <div className='gallery-page'>
      <h1>Gallery</h1>
      <div className='upload-box'>
      <form onSubmit ={submitImg}>
        <label>Please select Your Photo</label><br/>
        <input type="file" accept ='image/*' onChange={onImgChange}></input><br/>
         <button type ="submit">Upload</button>  
      </form>
      </div>
      <div className='gallery-images'>
      {allImage === null ? "" : allImage.map((data)=>(
        <img key ={data._id}
            src={`http://localhost:5000/files/${data.image}`}
            height ={100}
            width={100}
            alt="photos"
            >
        </img>
      ))}
    </div>
    </div>
    </div>
  );
}

export default ImgUploader;
