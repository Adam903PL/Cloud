const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080   
const path = require('path');
const fs = require('fs')



app.use(express.static(path.join(__dirname, '../dist')));


app.listen(PORT, () => {
    console.log(`Server started on  http://localhost:${PORT}`);
});




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


    

const folderPath = path.resolve(__dirname, '../Nowy');

const fileTypes = [
    "txt", "cpp", "css", "exe", "gif", "html", "jpg",
    "js", "mov", "pdf", "py", "svg", "zip", "png"
];

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
        res.json(filesWithSize);
    } catch (err) {
        res.status(500).json({ message: "Błąd odczytu folderu", error: err });
    }
});
