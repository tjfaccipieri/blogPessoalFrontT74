import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AxiosGet() {

  // estado que irá armazenar os dados dos usuarios que virão do servidor, atravez do Axios
  const [usuarios, setUsuario] = useState([])

  //efeito que irá solicitar os dados do backend toda vez que o componente for carregado em tela
  useEffect(() => {
    // axios.get => usamos a biblioteca Axios para executar uma requisição do tipo get no servidor que queremos os dados
    axios.get<any[]>('https://jsonplaceholder.typicode.com/users')
    // .then => assim que a solicitação for concluida, o then entra em ação, pegando o resultado da solicitação em uma variavel chamada "response", e colocando esses dados dentro do estado que foi criado acima.
      .then(response => {
      console.log(response.data)
      setUsuario(response.data)
    })
  }, [])
  // na linha acima, o [] vazio indica que esse efeito será executado sempre e apenas quando o componente for carregado na tela

  return (
    <div>
      {/* com o usuarios.map, pedimos para passar por todos os usuários que chegaram do servidor, e para cada um que for encontrado, queremos criar um novo usuario unico, e colocar o atributo "name" dele dentro de uma tag P do html */}
      {usuarios.map(usuario => (
        <p>{usuario.name}</p>
      ))}
    </div>
  )
}

export default AxiosGet