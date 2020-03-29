import React, { useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';
import api from '../../services/api';

export default function Incident () {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const history = useHistory()
    const ongKey = localStorage.getItem('ongKey');
    
    async function handleRegisterIncident (event) {

        event.preventDefault();

        const valueParse = parseFloat(value)

        const data = {
            title,
            description,
            value: valueParse,

        }

        try {

            await api.post('ong/incident/create', data, {
                headers: {
                    Authorization: ongKey
                }
            })

            history.push('/profile')

        } catch (error) {
            
            alert('Erro no Cadastro de um Novo Incident, por favor tente novamente')

        }

    }

    return (
        <div className="new-incident-container">
           <div className="content">
               <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhado para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
               </section>
               <form onSubmit={handleRegisterIncident}>
                    <input placeholder="Titulo do Caso" value={title} 
                    onChange={event => setTitle(event.target.value)} />
                    <textarea type="email" placeholder="Descrição" value={description} 
                    onChange={event => setDescription(event.target.value)}/>
                    <input placeholder="Valor em reais" value={value} 
                    onChange={event => setValue(event.target.value)}/>

                    <button className="button"  type="submit">Cadastrar</button>
               </form>
           </div>
       </div>
    )
}