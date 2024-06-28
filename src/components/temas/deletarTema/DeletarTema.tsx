import { useContext, useEffect, useState } from "react";
import Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function DeletarTema() {
  const [tema, setTema] = useState<Tema>({} as Tema)
  const navigate = useNavigate()
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  function retornar() {
    navigate("/temas")
}

  useEffect(() => {
    if(token === '') {
      alert("Você precisa ta logado né")
      navigate('/login')
    }
  }, [token])

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar tema</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o tema a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Tema
        </header>
        <p className="p-8 text-3xl bg-slate-200 h-full">
          Descrição do tema que vai de F
        </p>
        <div className="flex">
          <button className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2">
            Não
          </button>
          <button className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center">
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;
