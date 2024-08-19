import React, { useContext, useEffect, useState } from 'react'
import CardPostagem from '../cardPostagem/CardPostagem'
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagem';
import { useNavigate } from 'react-router-dom';
import { buscar } from '../../../services/Service';


function ListaPostagens() {
  // criar umm local para armazenar minhas postagens
  const [postagens, setPostagens] = useState<Postagem[]>([])
  const [dados, setDados] = useState<Postagem[]>([])

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
    const sse = new EventSource('http://localhost:8080/postagens/auto');
    console.log(sse);
    // Todo: ajeitar essa function pra não ficar bugando com array dentro de array
    function getRealtimeData(data) {
      // process the data here,
      // then pass it to state to be rendered
      console.log(dados);
      setDados(prevDados => [...prevDados, JSON.parse(data.data)]);
      
    }
    sse.onmessage = () => {buscarPostagens()}
    sse.onerror = () => {
      // error log here 
      
      sse.close();
    }

    // sse.

    sse.onopen = () => {
      buscarPostagens()
    }
    return () => {
      sse.close();
    };
  }, []);

  return (
    <div className='container mx-auto grid grid-cols-3 gap-8 my-6'>
      {postagens.map(postagem => (
        <CardPostagem key={postagem.id} postagem={postagem} />
      ))}
    </div>
  )
}

export default ListaPostagens
