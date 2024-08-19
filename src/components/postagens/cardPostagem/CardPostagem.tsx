import { Link } from 'react-router-dom';
import Postagem from '../../../models/Postagem';

interface CardPostagemProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagemProps) {
  return (
    <div className="border-black border rounded overflow-hidden">
      <div className="bg-indigo-400 flex items-center gap-8">
        <img className="w-14 rounded-full" src={postagem.usuario?.foto || 'https://i.imgur.com/0Hpwnjx.png'} alt="" />
        <h2>{postagem.usuario?.nome}</h2>
      </div>
      <div className="">
        <h2>Titulo da postagem: {postagem.titulo}</h2>
        <p>{postagem.texto}</p>
        <p>Tema: {postagem.tema?.descricao}</p>
        {/* <p>
          Data:{' '}
          {new Intl.DateTimeFormat(undefined, {
            dateStyle: 'long',
            timeStyle: 'short',
          }).format(new Date(postagem.data))}
        </p> */}
      </div>
      <div className="flex">
        <Link
          to={`/editarPostagem/${postagem.id}`}
          className="w-1/2 bg-indigo-400 py-2 font-bold text-white hover:bg-indigo-800 flex justify-center"
        >
          <button>Editar</button>
        </Link>
        <Link to={`/deletarPostagem/${postagem.id}`} className="w-1/2 bg-red-400 py-2 font-bold text-white hover:bg-red-800 flex justify-center">
        <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;
