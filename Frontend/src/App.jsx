import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import AddNew from './Components/AddNew/AddNew'
import Navbar from './Components/Navbar/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add-new" element={<AddNew />}></Route>
      </Routes>
    </>
  )
}

export default App
