import './imageuploader.scss';
import { BsImageFill } from 'react-icons/bs';
import { useState } from 'react';

const ImageUploader = ({imgUrl, setParentImg}) => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [selectedImgBase, setSelectedImgBase] = useState(null);

    const onSelectImg = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        if(file){
            setSelectedImg(file);
            setParentImg(file);
            reader.onloadend = () => {
                setSelectedImgBase(reader.result);
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="imgUploadContainer">
            <label htmlFor="upload">
                {imgUrl || selectedImgBase?
                    <img src={selectedImgBase || imgUrl} alt="Error"/>
                :
                    <BsImageFill size={90} color={"gray"}/>
                }
                <input onChange={onSelectImg} type="file" id="upload" style={{display: "none"}} />
            </label>
            <div className="nameAndUpload">
                <span>{"Imagen: " + (selectedImg?selectedImg.name:imgUrl?imgUrl.split("/").pop():"No se ha seleccionado")}</span>
            </div>
        </div>
    );
}

export default ImageUploader;
