import React, { useState ,useEffect } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './style.css';
import api from '../../services/api';

export default function Profile () {

    const [incidents, setIncitends] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongKey = localStorage.getItem('ongKey');
    const history = useHistory()

    useEffect(() => {
        api.get('ong/profile', {
            headers: {
                Authorization: ongKey
            }
        }).then(response => {
            setIncitends(response.data)
        })
    }, [ongKey])

    async function handleDelete (id) {

        try {
           await api.delete(`ong/incident/${id}`, {
                headers: {
                    Authorization: ongKey
                }
           })

           setIncitends(incidents.filter(item => item.id !== id))
        } catch (error) {
            console.error(error)
            alert('Erro a deletar caso, tente novamente')
        }

    }

    function handleLogout () {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                    <span>Bem vinda, <strong>{ongName}</strong></span>

                <Link className="button" to="/incident/new">
                   Cadastrar novo caso 
                </Link>
                <button onClick={handleLogout} type="button">
                    < FiPower size={18} color="#E02041" />   
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(item => (
                    <li key={item.id} >
                    <strong>CASO !</strong>
                    <p>{item.title}</p>

                    <strong>DESCRIÇÕES</strong>
                    <p>{item.description}</p>

                    <strong>VALOR: </strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}</p>

                    <button onClick={() => handleDelete(item.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}