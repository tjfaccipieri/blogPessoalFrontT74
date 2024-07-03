import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert('Usuário deslogado com sucesso');
    navigate('/login');
  }

  let navbarComponent;

  if (usuario.token !== '') {
    navbarComponent = (
      <div className="w-full bg-indigo-900 text-white flex justify-center py-4">
        <div className="container flex justify-between text-lg">
          <div className="text-2xl font-bold uppercase">Blog Pessoal</div>

          <div className="flex gap-4">
            <Link to="/home" className="hover:underline cursor-pointer">
              Postagens
            </Link>
            <Link to="/temas" className="hover:underline cursor-pointer">
              Temas
            </Link>
            <Link
              to="/formularioTema"
              className="hover:underline cursor-pointer"
            >
              Cadastrar tema
            </Link>
            <div className="hover:underline cursor-pointer">Perfil</div>
            <Link
              to="/"
              onClick={logout}
              className="hover:underline cursor-pointer"
            >
              Sair
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}

export default Navbar;
