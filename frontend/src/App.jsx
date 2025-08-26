import { Routes, Route } from "react-router-dom"
import Login from "./pages/Auth/login"
import Dashboard from "./pages/Dashboard/Dashboard"
function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
