import { Link } from "react-router-dom";
import Tema from "../../../models/Tema";


interface CardTemaProps {
  tema: Tema
}

function CardTema({tema}: CardTemaProps) {
  return (
    <div className="border-2 border-black rounded-xl overflow-hidden">
      <h3 className="text-xl font-bold bg-indigo-800 text-white px-2 py-1">Tema</h3>
      <p className="px-2 py-1">{tema.descricao}</p>
      <p className="px-2 py-1">ID desse tema: {tema.id}</p>
      <div className="flex">
        <Link to={`/editarTema/${tema.id}`} className="py-2 font-bold text-white uppercase bg-indigo-400 hover:bg-indigo-800 w-full text-center">
          editar
        </Link>
        <Link to={`/deletarTema/${tema.id}`} className="py-2 font-bold text-white uppercase bg-red-400 hover:bg-red-800 w-full text-center">
          deletar
        </Link>
      </div>
    </div>
  );
}

export default CardTema;
