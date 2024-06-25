import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="w-full bg-indigo-900 text-white flex justify-center py-4">
        <div className="container flex justify-between text-lg">
          <div className="text-2xl font-bold uppercase">Blog Pessoal</div>

          <div className="flex gap-4">
            <Link to='/login' className="hover:underline cursor-pointer">Login</Link>
            <Link to='/home' className="hover:underline cursor-pointer">Postagens</Link>
            <div className="hover:underline cursor-pointer">Temas</div>
            <div className="hover:underline cursor-pointer">Cadastrar tema</div>
            <div className="hover:underline cursor-pointer">Perfil</div>
            <div className="hover:underline cursor-pointer">Sair</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
