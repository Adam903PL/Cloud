import File from "./file.tsx";
import './css/Documents.css';
import  { useState, useEffect } from 'react';

function Documents() {
    const [documents, setDocuments] = useState<any[]>([]);
    const [showFiles, setShowFiles] = useState(true); // Stan do kontrolowania widoczności div

    const fileTypes: Array<string> = [
        "txt",
        "cpp",
        "css",
        "exe",
        "gif",
        "html",
        "jpg",
        "js",
        "mov",
        "pdf",
        "py",
        "svg",
        "zip",
        "png"
    ];

    useEffect(() => {
        // fetch("http://192.168.11.129:5000/api/files")
        fetch("http://localhost:8080/api/files")
            .then((response) => response.json())
            .then((data) => {
                const updatedData = data.map((file: any) => {
                    const fileName = file.name;
                    const fileType = fileName.split('.').pop();

                    const isFolder = !fileTypes.includes(fileType);
                    return {
                        ...file,
                        fileType: isFolder ? 'folder' : fileType
                    };
                });
                setDocuments(updatedData);
            })
            .catch((error) => console.error("Error fetching files:", error));
    }, []);

    const hideFilesContent = () => {
        setShowFiles(false); 
    };

    return (
        <>
            {showFiles && (
                <div className="mainFilesDiv" id="fileDiv" onClick={hideFilesContent}>

                </div>
            )}

            <div className="mainContainer">
                <div className='mainContainerFolder'>
                    {documents.map((file, index) => (
                        file.fileType === 'folder' && (
                            <File key={index} name={file.name} fileSize={file.size} fileType={file.fileType} />
                        )
                    ))}
                </div>
                <div className='mainContainerFiles'>
                    {documents.map((file, index) => (
                        file.fileType !== 'folder' && (
                            <File key={index} name={file.name} fileSize={file.size} fileType={file.fileType} />
                        )
                    ))}
                </div>
            </div>
        </>
    );
}

export default Documents;
