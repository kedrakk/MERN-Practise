import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook.jsx";
import ShowBook from "./pages/ShowBook.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";
import DeleteBook from "./pages/DeleteBook.jsx";


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<UpdateBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  )
}

export default App