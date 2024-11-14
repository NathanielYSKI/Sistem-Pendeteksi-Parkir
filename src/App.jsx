import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Bar from "./Bar";
import Footer from "./Footer";
import Findout from "./Findout";
import CekParkir from './CekParkir'; 
import Intro from "./Intro";
import ParkirDetail from './ParkirDetail'; 
import Feature from "./Features";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Mengatur title berdasarkan path
    switch (location.pathname) {
      case '/':
        document.title = 'Homepage | EZPark';
        break;
      case '/cek-parkir':
        document.title = 'Cek Parkir | EZPark';
        break;
      case '/register':
        document.title = 'Register | EZPark';
        break;
      case '/login':
        document.title = 'Login | EZPark';
        break;
      default:
        if (location.pathname.startsWith('/cek-parkir/')) {
          document.title = `Parkir Detail | EZPark`;
        } else {
          document.title = 'EZPark';
        }
        break;
    }
  }, [location]);

  return (
<>
      {/* Render Bar dan Footer hanya jika bukan di halaman register */}
      {location.pathname !== '/register' && location.pathname !== '/login' && (
        <header>
          <Bar />
        </header>
      )}

      <Routes>
        <Route path="/" element={
          <div>
            <Intro />
            <Feature />
            <Findout />
          </div>
        } />
        <Route path="/cek-parkir" element={<CekParkir />} />
        <Route path="/cek-parkir/:mallId" element={<ParkirDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {/* Render Footer hanya jika bukan di halaman register */}
      {location.pathname !== '/register' && location.pathname !== '/login' && <Footer />}
    </>
  );
}

function Main() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Main;
