import { ChangeEvent, useContext, useEffect, useState } from "react";
import Postagem from '../../../models/Postagem';
import Tema from "../../../models/Tema";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormularioPostagem() {

  //useState para armazenar os dados da postagem que está sendo criada ou editada
  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: '',
    texto: '',
    data: '',
    tema: null,
    usuario: null
  })

  //useState para armazenar o tema que a pessoa escolher na caixa de select do form (Aqui vai ter apenas um tema)
  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: ''
  })

  //useState para armazenar a lista de temas que iremos puxar do backend quando o formulario for carregado, para criar o campo de select do formulário de forma automatizada (Aqui teremos uma lista de todos os temas)
  const [temas, setTemas] = useState<Tema[]>([])
  
  // =================================================================================
  const navigate = useNavigate()
  const {usuario, handleLogout} = useContext(AuthContext)
  const token = usuario.token
  
  useEffect(() => {
    if(token === '') {
      alert('Você precisa estar logado para isso')
      navigate('/login')
    }
  },[token])
    //O bloco acima inteiro será usado para verificar se o usuário está logado, atravez do token, e caso não tenha token, redirecionar para o login novamente
  // ==================================================================================
  
  //Verificar se na url do navegador, temos um ID, o que indica que a pessoa irá EDITAR uma postagem
  const {id} = useParams<{id: string}>()

  // funcção que irá buscar todos os temas no nosso backend
  // colocar um try catch aqui
  async function buscarTemas(){
    await buscar('/temas', setTemas, {
      headers: {Authorization: token}
    })
  }

  // função responsável por buscar um tema unico no nosso backend
  async function buscarTemaPorId(id: string) {
    await buscar(`/temas/${id}`, setTema, {
      headers: {Authorization: token}
    })
  }

  //variavel de controle, que irá permanecer TRUE enquanto o tema unico não tiver sido encontrado. Usamos ela para desabilitar o botão, impedindo o usuário de cadastrar uma postagem sem um tema
  const carregandoTema = tema.descricao === ''

  // função que irá buscar uma postagem por ID, para o caso de Edição da postagem, irá receber o ID que pegamos da URL, ali na linha 44
  async function buscarPostagemPorId(id: string) {
    await buscar(`/postagens/${id}`, setPostagem, {
      headers: {Authorization: token}
    })
  }

  //UseEffect que irá rodar assim que o formulario for carregado, e tbm caso o ID da URL mude. Ele irá sempre buscar todos os temas, e caso tenha um ID na url, irá buscar a postagem correta tbm.
  useEffect(() => {
    buscarTemas()
    if(id !== undefined) {
      buscarPostagemPorId(id)
    }
  }, [id])

  //função que irá pegar os dados que o usuário está digitando nos inputs do form, e atualizar para o envio da postagem. Ao mesmo tempo, reforça qual foi o tema escolhido, e vincula o usuário logado como dono da postagem
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario
    })
  }

  //useEffect que irá vincular o tema com a postagem no momento que o usuário escolher um tema no Select do form
  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema
    })
  }, [tema])

  //funcção responsável por enviar o usuário para a lista de postagens depois de Cadastrar/Editar uma postagem
  function retornar(){
    navigate('/postagens')
  }

  /**
   * Esta função lida com a criação ou atualização de uma postagem em um site, incluindo o tratamento de erros para tokens expirados.
   * @param e - O parâmetro `e` na função `gerarNovaPostagem` é do tipo `ChangeEvent<HTMLFormElement>`. Este parâmetro representa um evento que ocorre quando um elemento do formulário é alterado, como quando um usuário envia um formulário.
   */
  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({ postagem });

    if (id != undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert('Postagem atualizada com sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao atualizar a Postagem');
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert('Postagem cadastrada com sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao cadastrar a Postagem');
        }
      }
    }
  }

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8"></h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da postagem</label>
          <input
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da postagem</label>
          <input
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Tema da postagem</p>
          <select
            name="tema"
            id="tema"
            className="border p-2 border-slate-800 rounded"
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione um tema
            </option>
            <>
              {temas.map(tema => (
                <option key={tema.id} value={tema.id}>{tema.descricao}</option>
              ))}
            </>
          </select>
        </div>
        <button
          type="submit"
          className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2"
          disabled={carregandoTema}
        >
          {carregandoTema ? <span>Carregando</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default FormularioPostagem;
