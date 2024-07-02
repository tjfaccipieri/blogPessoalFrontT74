import React from 'react'
import Postagem from '../../../models/Postagem'


interface CardPostagemProps {
  postagem: Postagem
}

function CardPostagem({postagem}: CardPostagemProps) {
  return (
    <div className='border-black border'>
        <div className='bg-indigo-400 flex items-center gap-8'>
          <img className='w-14 rounded-full' src={postagem.usuario.foto} alt="" />
          <h2>{postagem.usuario.nome}</h2>
        </div>
        <div className=''>
          <h2>Titulo da postagem: {postagem.titulo}</h2>
          <p>{postagem.texto}</p>
          <p>Tema: {postagem.tema.descricao}</p>
          <p>Data: {new Intl.DateTimeFormat(undefined, {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  }).format(new Date(postagem.data))}</p>
        </div>
        <div className='flex'>
          <button className='w-1/2 bg-indigo-400'>Editar</button>
          <button className='w-1/2 bg-red-400'>Deletar</button>
        </div>
      </div>
  )
}

export default CardPostagem