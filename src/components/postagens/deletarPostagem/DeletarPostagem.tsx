import React, { useContext, useEffect, useState } from 'react'
import Postagem from '../../../models/Postagem'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { buscar, deletar } from '../../../services/Service'
import { toastAlerta } from '../../../utils/toastAlerta'

function DeletarPostagem() {

  // ir até o backend, com um ID de postagem, pegar ela, e armazenar no front
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  // reconhece o ID que ta na URL do site
  const {id} = useParams<{id: string}>()

  const {usuario} = useContext(AuthContext)
  const token = usuario.token

  const navigate = useNavigate()

  async function buscarPostagemPorId(id: string){
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token
        }
      })
    } catch (error) {
      toastAlerta('Deu erro, tem que ve isso ai', 'erro')
    }
  }

  useEffect(() => {
    buscarPostagemPorId(id)
  }, [])

  async function deletarPostagem(){
    try {
      await deletar(`/postagens/${id}`,{
        headers: {
          Authorization: token
        }
      })
      retornar()
      alert('Press F pra postagem')
    } catch (error) {
      alert('Deu pra deletar não')
    }
  }

  function retornar(){
    navigate('/home')
  }

  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>Deletar postagem</h1>

      <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar a postagem a seguir?</p>

      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>Postagem</header>
        <div className="p-4">
          <p className='text-xl h-full'>{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>
        <div className="flex">
          <button onClick={retornar} className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'>Não</button>
          <button onClick={deletarPostagem} className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center' >
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarPostagem