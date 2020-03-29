import React, { useState  } from 'react';
import './style.css';
import herosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Logon() {
    
    const [key_access, setKey_access] = useState('');
    const history = useHistory();

    async function handleLogin (event) {
        event.preventDefault();

        try {

            const response = await api.post('session', { key_access })
            
            localStorage.setItem('ongKey', key_access)
            localStorage.setItem('ongName', response.data)

            history.push('/profile')

        } catch (error) {
            console.log(error)
            alert('Falha no Login, tente Novamente')
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin} >
                    <h1>Faça seu Logon</h1>

                    <input placeholder="Sua ID" value={key_access}
                    onChange={event => setKey_access(event.target.value)} />
                    <button type="submit" className="button" >Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={herosImg} alt="Heroes"/>
        </div>
    );
}