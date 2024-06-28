import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import CardTema from '../cardTema/CardTema';
import { useNavigate } from 'react-router-dom';
import Tema from '../../../models/Tema';
import { buscar } from '../../../services/Service';
import { Dna } from 'react-loader-spinner';

function ListaTemas() {
  const [temas, setTemas] = useState<Tema[]>([])

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

  async function buscarTemas(){
    try {
      console.log(token);
      await buscar('/temas', setTemas, {
        headers: { Authorization: token },
      });
      console.log(temas);
    } catch (error) {
      alert('Deu ruim')
      console.log(error);
    }
  }

  useEffect(() => {
    buscarTemas()
  }, [temas.length])

  return (
    <>
    {temas.length === 0 && (
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}

      <div className="container mx-auto my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {temas.map(tema => (
              <CardTema key={tema.id} tema={tema} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ListaTemas;
