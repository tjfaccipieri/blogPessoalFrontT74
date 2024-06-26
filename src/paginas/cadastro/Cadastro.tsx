import React, { ChangeEvent, useState } from 'react'
import './Cadastro.css'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service'

function Cadastro() {

  // armazenar os dados que o usuario digitou no form
  const [usuario, setUsuario] = useState<Usuario>({
    // iremos iniciar o objeto usuário, com todos os seus valores em branco
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  // a função atualizarEstado irá receber o evento de mudança dos inputs, e para cada novo caractere digitado, iremos atualizar o estado de usuario criado acima, atualizando o campo correto, de acordo com o atributo "name" da tag html
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  // a função "cadastrarNovoUsuario" será responsavel por entender que o formulário está sendo enviado, e fazer a comunicação com o nosso backend
  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>){
    //inicialmente, iremos prevenir o comportamento padrão de um formulário, que seria atualizar a página
    e.preventDefault()

    // depois, iremos tentar cadastrar o usuário no backend, e caso tudo de certo, encerramos o código dentro do TRY
    try {
      // iremos aguardar a Promisse do Axios, de que ele levará nossos dados ao servidor, e se tudo der certo, damos o alerta e fim.
      await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario)
      alert('Deu bom.. é noiz')
    } catch (error) {
      // caso de algum erro no cadastro que tentamos no TRY, a parte do Catch irá reconhecer isso, e dar um alerta diferente para o nosso usuário
      alert('Deu ruim... =/')
    }
  }

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      <div className="fundoCadastro hidden lg:block"></div>
      <form className='flex justify-center items-center flex-col w-2/3 gap-3' onSubmit={cadastrarNovoUsuario} >
        <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
        <div className="flex flex-col w-full">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="usuario">E-mail</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuario"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="foto">Foto</label>
          <input
            type="text"
            id="foto"
            name="foto"
            placeholder="Foto"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex justify-around w-full gap-8">
          <button className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2' >
            Cancelar
          </button>
          <button className='rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2' type='submit'>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  </>
  )
}

export default Cadastro