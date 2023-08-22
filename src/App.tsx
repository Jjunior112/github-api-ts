import { useState } from 'react';
import { DiGithubBadge } from "react-icons/di";

import './App.css'

function App() {

  interface dataComponents {
    id?: number
    login?: string
    name?: string
    html_url?: string
    bio?: string
    created_at?: string
    company?: string
    blog?: string
    location?: string
    public_repos?: string
    message?: string
  }

  const [userName, setUserName] = useState<string>('');

  const [data, setData] = useState<dataComponents>({});

  const [info, setInfo] = useState<number>(0);

  const search = ():void => {

    if (userName) {
      fetch(`https://api.github.com/users/${userName}`, {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      })
        .then((resp) => resp.json())

        .then((data) => {
          setData(data);
          setInfo(1);
        })

        .catch((err) => {
          console.log(err);

        })
    }
  }

  return (
    <>
      <nav>
        <ul>
          <li><DiGithubBadge /></li>
          <li>Pesquisador de Usuários GitHub</li>
        </ul>
      </nav>

      <div className="search">
        <input
          type="text"
          placeholder='Digite o usuário do GitHub'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={search}>Pesquisar</button>
      </div>

      <div className="data">

        {data.id && (
          <section>
            <h2>{data.login}</h2>
            <ul>
              <li><span>Nome: </span> {data.name}</li>
              <li><span>ID: </span> {data.id}</li>
              <li> <span>Url: </span> <a href={data.html_url} target='__blank'>{data.html_url}</a></li>
              <li><span>descrição: </span> {data.bio}</li>
              <li><span>Usuário desde: </span> {data.created_at}</li>
              <li><span>Company: </span> {data.company}</li>
              <li><span>Blog: </span> <a href={data.blog} target='__blank'>{data.blog}</a></li>
              <li><span>Local: </span> {data.location}</li>
              <li> <span>Nº de repos: </span> {data.public_repos}</li>
              <li><span>Repos: </span>  <a href={data.html_url + '?tab=repositories'} target='__blank'>{data.html_url + '?tab=repositories'}</a></li>
            </ul>
          </section>
        )}
        {
          info === 0 && (
            <h2>pesquise o usuário!!!</h2>
          )
        }
        {
          data.message && (
            <h2>Usuário não encontrado</h2>
          )
        }
      </div >
    </>
  )
}

export default App
