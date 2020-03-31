import React , {useState} from 'react';
import './styles.css'

import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import LogoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function NewIncident()   {
    const [title, setTitle] = useState('');
    const [description, setDesciption] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    
    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('casos', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            console.log("Entrou");

        history.push('/profile');
        } catch(err){
            alert('Erro ao cadastrar caso, tente novamente');
        }
    }
    return  (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src= {LogoImg} alt="Be the Hero"/>
                    <h1>Cadastro no caso</h1>
                    <p>Descreva o texto detaladamente para encontrar um heroi para resolver isso</p>
                        <Link className="back-link" to = "/profile">
                            <FiArrowLeft size ={16} style={{marginRight: 5}}  color="E02041"/>
                            Voltar para home
                        </Link>
                </section>
                <form onSubmit = {handleNewIncident} >
                    <input placeholder="Titulo do caso"
                    value ={title}
                    onChange={e => setTitle(e.target.value)}
                    />

                    <textarea placeholder="Descrição"
                    value={description}
                    onChange={e => setDesciption(e.target.value)}
                    />
  
                    <input placeholder ="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />
                    <button  type="submit" className="button" >Cadastrar</button>
                    
                </form>
            </div>
        </div>
    );
    
}