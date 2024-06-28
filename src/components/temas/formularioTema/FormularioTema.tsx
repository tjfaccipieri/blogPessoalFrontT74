import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Tema from '../../../models/Tema';
import { atualizar, buscar, cadastrar } from '../../../services/Service';

function FormularioTema() {
  const [tema, setTema] = useState<Tema>({} as Tema);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    await buscar(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  useEffect(() => {
    if (token === '') {
      //voltar pro login
      alert('Ta tirando...');
      navigate('/login');
    }
  }, [token]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      try {
        await atualizar('/temas', tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        alert('Tema atualizado');
        retornar();
      } catch (error: any) {
        //não faço ideia do q é o toString
        if (error.toString().includes('403')) {
          alert('Token vencido, loga denovo');
          handleLogout();
        } else {
          alert('Erro ao atualizar o tema');
        }
      }
    } else {
      try {
        await cadastrar('/temas', tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        alert('Tema cadastrado');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('Token vencido, loga denovo');
          handleLogout();
        } else {
          alert('Erro ao cadastrar o tema');
        }
      }
    }
  }

  function retornar() {
    navigate('/temas');
  }

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-center my-8 text-4xl">
          {id === undefined ? 'Cadastrar novo tema' : 'Atualizar tema'}
        </h1>

        <form onSubmit={gerarNovoTema} className="mx-auto w-1/2">
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="descricao">Descrição do tema</label>
            <input
              type="text"
              className="border-2 border-slate-700 rounded-lg p-2"
              id="descricao"
              name="descricao"
              value={tema.descricao}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <button
            className="bg-indigo-400 hover:bg-indigo-800 rounded-lg w-1/2 mx-auto block py-2 text-white"
            type="submit"
          >
            {id === undefined ? 'Cadastrar' : 'Atualizar'}
          </button>
        </form>
      </div>
    </>
  );
}

export default FormularioTema;
