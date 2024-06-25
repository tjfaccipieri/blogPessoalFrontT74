import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';

function App() {
  return (
    <>
      {/* agora você sabe que eu vou usar navegação */}
      <BrowserRouter>
        {/* aqui são as rotas possiveis pro usuario */}
        <Navbar />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
          <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
