import { BrowserRouter, Routes, Route } from "react-router-dom";
import Documents from "./Documents";
import FolderPage from "./FolderPage";

function App() {
  return (  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Documents />} />
        <Route path="/folder" element={<FolderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;