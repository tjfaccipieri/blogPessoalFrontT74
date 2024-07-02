import React, { useContext, useEffect, useState } from 'react'
import CardPostagem from '../cardPostagem/CardPostagem'
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagem';
import { useNavigate } from 'react-router-dom';
import { buscar } from '../../../services/Service';

function ListaPostagens() {
  // criar umm local para armazenar minhas postagens
  const [postagens, setPostagens] = useState<Postagem[]>([])

  //verificar se eu tenho um token
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  const navigate = useNavigate()

  useEffect(() => {
    if(token === '') {
      //voltar pro login
      alert('Ta tirando...')
      navigate('/login')
    }
  }, [token])
  //acessar meu backend e pedir as postagens
  async function buscarPostagens(){
    try{
      await buscar('/postagens', setPostagens, {
        headers: {Authorization: token}
      })
    } catch (error) {
      alert('Deu ruim')
      console.log(error);
    }
  }

  useEffect(() => {
    buscarPostagens()
  }, [postagens.length])

  return (
    <div className='container mx-auto grid grid-cols-3 gap-8'>
      {/* carregar um card para cada postagem */}
      {postagens.map(postagem => (
        <CardPostagem key={postagem.id} postagem={postagem} />
      ))}
    </div>
  )
}

export default ListaPostagens