//Faz as operacoes com o banco para challenges (exercicios) e ciclos

import Cookies from "js-cookie";


const API_URL = process.env.NEXT_PUBLIC_API;
// Da pra melhorar essa function antes de usar, torna-la mais generica.
const request_options = (...body) => {
    return  {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('access_token')
        },
        body: JSON.stringify({...body})
    }
}

const handleRes = async (res: Response, error_message: string) => {
        if(res.ok){
            const json = await res.json();
            return json;
        }
        else{
           throw Error(error_message);
        }
}

const getChallenge = async type => {
    return await fetch(`${API_URL}/exercicio/${type}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('access_token')
        },
    })
    .then( async res =>{
        return await handleRes(res,'Não foi possível carregar um desafio. Por favor, tente novamente mais tarde.');
    })
}

const confirmaChallenge = async (usuario_id, exercicio_id, intervalo) =>{
    return await fetch(`${API_URL}/exercicio/realizar-exercicio`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('access_token')
        },
        body: JSON.stringify({usuario_id, exercicio_id, intervalo})
    })
    .then( async res =>{
        return await handleRes(res,'Não foi possível confirmar o ciclo. Por favor, tente novamente mais tarde.')
    })
}

const cancelarChallenge_Rotina = async (id_ciclo) =>{
    return await fetch(`${API_URL}/api/cancelarRotina`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('access_token')
        },
        body: JSON.stringify({id_ciclo})
    })
    .then( async res =>{
        return await handleRes(res,'Não foi possível cancelar o ciclo. Por favor, tente novamente mais tarde.')
    })
}

export default {
    getChallenge,
    confirmaChallenge,
    cancelarChallenge_Rotina
}
