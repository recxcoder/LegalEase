import { BrowserRouter, Routes, Route } from "react-router-dom"
import Upload from "./pages/Upload"
import Results from "./pages/Results"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}