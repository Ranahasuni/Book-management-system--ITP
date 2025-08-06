import React,{useEffect, useState} from 'react';
import Nav from "../Nav/Nav";
import axios from 'axios';
import PdfComp from "./PdfComp";
import { pdfjs } from 'react-pdf';
import './SendPdf.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function SendPdf() {
    const [title,setTitle] =useState("");
    const [file,saveFile] =useState(null);
    const [allPdf,setAllPdf] =useState(null);
    const [pdfFile,setPDFFile] =useState(null);

    useEffect(() =>{
        getpdf();
    },[]);
    const getpdf = async ()=>{
        const result = await axios.get("http://localhost:5000/getFile");
        console.log(result.data.data);
        setAllPdf(result.data.data);
    };

    const submitPdf = async (e) =>{
       e.preventDefault(); 

       const formData= new FormData();
       formData.append("title",title);
       formData.append("file",file);
       console.log(title,file);
    
    try{
        const result= 
             await axios.post("http://localhost:5000/uploadfile",
            formData,{
                headers:{'content-Type':'multipart/form-data'}
            });
            console.log(result);

            if(result.data.status===200){
                alert("upload success")
                getpdf();
            }else{
               alert("upload Error"); 
            }
    }catch(error){
        console.error("Error Uploading : " + error.message);
        alert("Error Uploading: ");
    }
    };
    const showPdf =(pdf) =>{
        setPDFFile(`http://localhost:5000/files/${pdf}`);
    };

  return (
    <div>
        <Nav/>
        <div className='upload-container'>
        <h1>upload pdf</h1>
         <form onSubmit={submitPdf}>
            <label>Title</label><br/>
            <input required type='text' onChange={(e) => setTitle(e.target.value)}></input><br/>
            <label>PDF File</label><br/>
            <input type ='file' accept='application/pdf' onChange={(e) => saveFile(e.target.files[0])}required></input><br/>
            <br/>
            <button type="submit">Upload</button>
         </form>
         </div>
         <div>
            <h4 className='pdf-list-title'>PDF List</h4>
            <div className='pdf-cards-container'>
            {allPdf == null
             ? ""
             : allPdf.map((data)=>(
                <div  className='pdf-card' key ={data._id}>
                    <h3>Title:{data.title}</h3>
                    <button onClick={()=> showPdf(data.pdf)}>Show PDF</button>
                </div>
            ))}
            </div>
         </div>
         <PdfComp pdfFile={pdfFile}/>
    </div>
 
  );
}

export default SendPdf;
