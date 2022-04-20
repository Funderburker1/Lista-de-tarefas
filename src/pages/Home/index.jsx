import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import '../Home/styles.scss';

export function Home() {
   const [nome, setNome] = useState("");
   const [user, setUser] = useState({ name: '', avatar: '' })
   const [hora, setHora] = useState("");
   const [tarefas, setTarefas] = useState([]);

   function addTarefa() {
      const novaTarefa = {
         name: nome,
         time: hora,
         timeH: new Date().toLocaleTimeString("pt-br", {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
         })
      };

      setTarefas(estadoAnterior => [...estadoAnterior, novaTarefa])
   }

   useEffect(() => {
      fetch('https://api.github.com/users/devjoaocamargo')
         .then(res => res.json())
         .then(data => {
            setUser({
               name: data.login,
               avatar: data.avatar_url,
            })
         })
   }, [])

   return (
      <main>
         <div className="home">
            <header>
               <h1>Lista de Tarefas</h1>
               <span>
                  <p>{user.name}</p>
                  <img src={user.avatar} alt="" />
               </span>
            </header>
            <input
               type="text"
               placeholder="ex: Estudar"
               onChange={e => setNome(e.target.value)}
            />
            <input
               type="text"
               placeholder="ex: 10:00 as 14:00"
               onChange={e => setHora(`${e.target.value} hrs`)}
            />

            <button type="button" className="btn" onClick={addTarefa}>Adicionar</button>

            {
               tarefas.map(t => <Card name={t.name} time={t.time} key={t.timeH} />)
            }

         </div>
      </main>
   );
}