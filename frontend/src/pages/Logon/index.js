import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import Logo from '../../assets/logo.svg';
import api from '../../services/api';
export default function Logon() {
    const [ong_id, setOng_id] = useState('');
    const history = useHistory();
    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const response = await api.post('/sessions', {ong_id});

            localStorage.setItem('ong_id', ong_id);
            localStorage.setItem('ong_name', response.data.name);
            history.push('/profile');
        } catch (e) {
            alert('falha no login, tente novamente');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={Logo} alt="Logomarca Be The Hero"/>
                <form onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
                    <input value={ong_id} onChange={e => setOng_id(e.target.value)} placeholder="Sua ID"/>
                    <button className="btn" type="submit">Entrar</button>
                    <Link className="back-link" to="/register"> 
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}