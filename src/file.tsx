import React from 'react';
import folderIcon from './assets/icons/folder.svg';
import txtIcon from './assets/icons/txt-svg-icon.svg';
import cppIcon from './assets/icons/cpp-svg-icon.svg';
import cssIcon from './assets/icons/css-svg-icon.svg';
import exeIcon from './assets/icons/exe-svgrepo-com.svg';
import gifIcon from './assets/icons/gif-svgrepo-com.svg';
import htmlIcon from './assets/icons/html-svgrepo-com.svg';
import jpgIcon from './assets/icons/jpg-svgrepo-com.svg';
import jsIcon from './assets/icons/js-svgrepo-com.svg';
import movIcon from './assets/icons/mov-svgrepo-com.svg';
import pdfIcon from './assets/icons/pdf-svgrepo-com.svg';
import pyIcon from './assets/icons/py-svgrepo-com.svg';
import svgIcon from './assets/icons/svg-svgrepo-com.svg';
import zipIcon from './assets/icons/zip-svgrepo-com.svg';
import pngIcon from './assets/icons/png-svg-icon.svg';
import './css/file.css';

interface Props {
    name: string,
    fileType: string,
    fileSize: number
}

const File: React.FC<Props> = (props) => {
    let icon: string; 

    switch (props.fileType) {
        case "folder":
            icon = folderIcon;
            break;
        case "txt":
            icon = txtIcon;
            break;
        case "cpp":
            icon = cppIcon;
            break;
        case "css":
            icon = cssIcon;
            break;
        case "exe":
            icon = exeIcon;
            break;
        case "gif":
            icon = gifIcon;
            break;
        case "html":
            icon = htmlIcon;
            break;
        case "jpg":
            icon = jpgIcon;
            break;
        case "js":
            icon = jsIcon;
            break;
        case "mov":
            icon = movIcon;
            break;
        case "pdf":
            icon = pdfIcon;
            break;
        case "py":
            icon = pyIcon;
            break;
        case "svg":
            icon = svgIcon;
            break;
        case "zip":
            icon = zipIcon;
            break;
        case "png":
            icon = pngIcon;
            break
        default:
            icon = "folder"
            break;
    }


    const generateEndPoint = (event:any) => {
        const id = event.currentTarget.id; 
        console.log(`Kliknięto element z id: ${id}`,`http://localhost:5000/api/files/${id}`);

        fetch(`http://localhost:5000/api/files/${id}`)
        .then((res) => res.json())
        .then((data) =>  console.log(data,"sadasdasdasd"))

        

    }
    

    return (
        <div onClick={generateEndPoint}  className={props.fileType === "folder" ? 'folderContainer' : 'fileContainer'} id={props.name}>
            <div className='datas'>
                <img src={icon} alt={props.fileType} className='folerSvg' />
                <p className='fileName'>{props.name}</p>
                {props.fileType !== "folder" && <p className='fileSize'>{props.fileSize} KB</p>}
            </div>
        </div>
    );
}

export default File;
