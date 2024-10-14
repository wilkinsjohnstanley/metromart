import{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Product from "./pages/Product"
import Add from "./pages/Add"
import Update from "./pages/Update"
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<Product/>}></Route>
          <Route path ="/add" element={<Add/>}></Route>
          <Route path ="/update" element={<Update/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
