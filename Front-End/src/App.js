import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
import HomePage from "./components/HomePage";
import Landing from "./components/Landing";
import SignUp from "./components/Signup";
import Trip from "./components/Trip";
import MyTrips from "./components/MyTrips";
import DocumentManager from "./components/Documents"

export default function App() {
  return (
    <div style={{ height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/trip" element={<MyTrips />} />
          <Route path="/documents" element={<DocumentManager />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
