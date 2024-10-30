const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080   
const path = require('path');
const fs = require('fs');
const e = require('express');
let fetch;

(async () => {
    fetch = (await import('node-fetch')).default;


    app.use(express.static(path.join(__dirname, '../dist')));






app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});



    

const folderPath = path.resolve(__dirname, '../Nowy');

const fileTypes = [
    "txt", "cpp", "css", "exe", "gif", "html", "jpg",
    "js", "mov", "pdf", "py", "svg", "zip", "png"
];


let folderEndpoints = []



const getFilesWithSize = (dirPath) => {
    const files = fs.readdirSync(dirPath);
    return files.map(file => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        const fileType = file.split('.').pop();
            
        return {
            name: file,
            size: stats.size,
            fileType: stats.isDirectory() ? 'folder' : (fileTypes.includes(fileType) ? fileType : 'unknown')
        };
    });
};




app.get('/api/files', (req, res) => {
    try {
        const filesWithSize = getFilesWithSize(folderPath);
        res.json(filesWithSize);
    } catch (err) {
        res.status(500).json({ message: "Błąd odczytu folderu", error: err });
    }
});

app.get('/api/files/*', (req, res) => {
    try {
        const relativePath = req.params[0]; 
        const fullPath = path.join(folderPath, relativePath);

        if (!fs.existsSync(fullPath)) {
            return res.status(404).json({ message: "Folder nie istnieje" });
        }

        const filesWithSize = getFilesWithSize(fullPath);
        if(filesWithSize.fileType === "folder"){
            folderEndpoints.push(filesWithSize.name)
        }
        res.json(filesWithSize);
    } catch (err) {
        res.status(500).json({ message: "Błąd odczytu folderu", error: err });
    }
});
const exploreFolder = (url) => {
    return fetch(url)
        .then((res) => res.json())
        .then((data) => {

            return Promise.all(
                data.map((item) => {
                    if (item.fileType === 'folder') {
                        const folderUrl = `${url}/${item.name}`;
                        console.log(`Sprawdzanie folderu: ${folderUrl}`);

 
                        return exploreFolder(folderUrl);
                    } else {
                        console.log(`Znaleziono plik: ${item.name}`);
                        return Promise.resolve(); 
                    }
                })
            );
        })
        .catch((err) => {
            console.error(`Błąd podczas przetwarzania folderu: ${url}`, err);
        });
};

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);


    fetch("http://localhost:8080/api/files")
        .then((res) => res.json())
        .then(() => {
            console.log('Rozpoczynam eksplorację folderów...');
            return exploreFolder("http://localhost:8080/api/files");
        })
        .then(() => {
            console.log('Eksploracja folderów zakończona.');
        })
        .catch((err) => {
            console.error('Błąd podczas początkowego fetch:', err);
        });
});
})();