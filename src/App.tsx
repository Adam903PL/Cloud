
import Documents from "./Documents";
import FolderPage from "./FolderPage";
import { BrowserRouter,Routes,Route } from "react-router-dom"
function App() {


 
  return (
      <>
        <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Documents/>}/>
            <Route path="/folder" element={<FolderPage/>}/>
           </Routes>
        </BrowserRouter>
        </div>

      </>
  );
}

export default App
