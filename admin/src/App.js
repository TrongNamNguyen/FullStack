import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Admin from './Pages/Admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backend_url = "http://localhost:4000";
export const currency = "₫";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/*" element={<Admin />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
