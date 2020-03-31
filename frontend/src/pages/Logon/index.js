import React, {useState} from 'react';
import './styles.css';
import { FiLogIn} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault()

        try{
            const response = await api.post('sections', {id});
            localStorage.setItem('ongId', id); 
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile')
            
        }catch (err) {
            alert("Falha no login");
        }
    }
    return(
        <div className="logon-container"> 

        <section className="form">
            <img src= {logoImg} alt = "Be the Hero"/>

            <form onSubmit = {handleLogin}>
                <h1>Faça seu Logon</h1>

                <input placeholder="Sua Id"
                value = {id}
                onChange={e=> setId(e.target.value)}/>
                <button className="button" type = "submit" >Entrar</button>  

                <Link className="back-link" to ="/register"> 
                <FiLogIn size={16} style={{marginRight: 5}} color="#E02041" />
                    Nao tenho Cadastro
                    </Link>        
            </form>
        </section>

        <img src = {heroesImg} alt="Heroes"/>
        </div>
        
    );
}