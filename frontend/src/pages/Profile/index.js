import React, {useState, useEffect} from 'react';
import Logo from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const ong_id = localStorage.getItem('ong_id');
    const history = useHistory();

    useEffect(() => {
        api.get('/profile', {
            headers: {ong_id}
        }).then(res => {
            setIncidents(res.data);
        });
    }, [ong_id]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {ong_id}
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (e) {
            alert('erro ao deletar caso, tente novamente');   
        }
    }
    
    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={Logo} alt="Logomarca Be The Hero"/>
                <span>Bem-vinda {localStorage.getItem('ong_name')}</span>
                <Link className="btn" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}><FiPower size={18} color="#e02041"/></button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR: </strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button type="button" onClick={() => handleDeleteIncident(incident.id)} >
                            <FiTrash2 size={18} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}